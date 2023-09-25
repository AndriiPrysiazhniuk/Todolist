import {FilterValuesType} from "../App";
import {v1} from "uuid";
import {TodolistType} from "../AppWithRedux";
import {todolistApi, TodolistResponseType} from "../api/todolist-api";
import {Dispatch} from "redux";


type ActionType =
    RemoveTodolistACType
    | AddTodolistACType
    | ChangeTodolistTitleACType
    | ChangeTodolistFilterACType
    | SetTodolistACType

const initialState: Array<TodolistType> = []
export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.todolistId)
        case "ADD-TODOLIST":
            const newTodo: TodolistType = {id: action.todolistId, title: action.title, filter: 'all'}
            return [...state, newTodo]
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
export const setTodolistAC = (todolists: Array<TodolistResponseType>) => {
    return {type: 'SET-TODOLISTS', todolists} as const
}

export const fetchTodolistThunk = (dispatch: Dispatch) => {
    todolistApi.getTodolist()
        .then((res) => {
            dispatch(setTodolistAC(res.data))
        })
}