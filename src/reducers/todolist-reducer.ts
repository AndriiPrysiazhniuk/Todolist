import {v1} from "uuid";
// import {TodolistType} from "../AppWithRedux";
import {todolistApi, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";


type ActionType =
    RemoveTodolistACType
    | AddTodolistACType
    | ChangeTodolistTitleACType
    | ChangeTodolistFilterACType
    | SetTodolistACType

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.todolistId)
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
        }
        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.id === action.todolistId ? {...el, title: action.title} : el)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(el => el.id === action.todolistId ? {...el, filter: action.filter} : el)
        case "SET-TODOLISTS":
            return action.todolists.map(el => ({...el, filter: 'all'}))
        default:
            return state
    }
}

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', todolistId} as const
}

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()} as const
    // return {type: 'ADD-TODOLIST', title, todolistId: v1()} as const
}

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistId, title} as const
}

type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', todolistId, filter} as const
}

export type SetTodolistACType = ReturnType<typeof setTodolistAC>
export const setTodolistAC = (todolists: Array<TodolistType>) => {
    return {type: 'SET-TODOLISTS', todolists} as const
}

export const fetchTodolistTC = () => (dispatch: Dispatch) => {
    // todolistApi.getTodolist()
    // .then((res) => {
    //     dispatch(setTodolistAC(res.data))
    // })

    todolistApi.getTodolist()
        .then((res) => {
            console.log(res.data)
            dispatch(setTodolistAC(res.data))
        })
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistApi.deleteTodolist(todolistId)
        .then((res) => {
            console.log(res.data)
            dispatch(removeTodolistAC(todolistId))
        })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistApi.createTodolist(title)
        .then((res) => {
            console.log(res.data)
            dispatch(addTodolistAC(title))
        })
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistApi.updateTodolist(todolistId, title)
        .then((res) => {
            console.log(res.data)
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
}
// export const changeTodolistFilterTC = (todolistId: string, filter: FilterValuesType) => (dispatch: Dispatch) => {
//     todolistApi.updateTodolist(todolistId, filter)
//         .then((res) => {
//             console.log(res.data)
//             dispatch(changeTodolistFilterAC(todolistId, filter))
//         })
// }

