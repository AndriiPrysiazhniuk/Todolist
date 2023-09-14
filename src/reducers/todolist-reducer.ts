import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";


type ActionType = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleACType | ChangeTodolistFilterACType
export const todolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.todolistId)
        case "ADD-TODOLIST":
            const newTodolistId = v1()
            const newTodo: TodolistType = {id: newTodolistId, title: action.title, filter: 'all'}
            return [...state, newTodo]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.id === action.todolistId ? {...el, title: action.title} : el)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(el => el.id === action.todolistId ? {...el, filter: action.filter} : el)
        default:
            throw new Error('I don`t understand this type')
    }
}

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', todolistId} as const
}

type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title} as const
}

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistId, title} as const
}

type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', todolistId, filter} as const
}