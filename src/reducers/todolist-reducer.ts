import {todolistsAPI, TodolistType, UpdateTaskModelType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "./app-reducer";

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
export type SetTodolistEntityStatusACType = ReturnType<typeof setTodolistEntityStatusAC>

type ActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsACType
    | SetTodolistEntityStatusACType

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0,
                entityStatus: 'succeeded'
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case 'SET-TODOLISTS':
            return action.todolists.map(el => ({
                ...el,
                filter: 'all'
            }))
        case "SET-TODOLIST-ENTITY-STATUS":
            return state.map(el => (
                el.id === action.id ? {...el, entityStatus: action.status} : el
            ))
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const addTodolistAC = (todolistId: string, title: string) => {
    return {type: 'ADD-TODOLIST', title, todolistId} as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const
}
export const setTodolistsAC = (todolists: Array<TodolistDomainType>) => {
    return {type: 'SET-TODOLISTS', todolists} as const
}
export const setTodolistEntityStatusAC = (id: string, status: RequestStatusType) => {
    return {type: 'SET-TODOLIST-ENTITY-STATUS', id, status} as const
}

// thunk creators
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const removeTodolistsTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setTodolistEntityStatusAC(todolistId, 'loading'))
    todolistsAPI.deleteTodolist(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setTodolistEntityStatusAC(todolistId, 'succeeded'))

        })
}
export const addTodolistsTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item.id, res.data.data.item.title))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                if (res.data.messages.length) {
                    dispatch(setAppErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setAppErrorAC('Some error occurred'))
                }
                dispatch(setAppStatusAC('failed'))
            }
        })
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.updateTodolist(todolistId, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC(todolistId, title))
            dispatch(setAppStatusAC('succeeded'))
        })
}


