import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType} from "./todolist-reducer";

type ActionType =
    RemoveTaskACType
    | AddTaskType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodolistACType
    | RemoveTodolistACType

const initialState: TasksStateType = {}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .filter(el => el.id !== action.taskId)
            }
        case "ADD-TASK":
            const newTask = {id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.todolistId]: [newTask, ...state[action.todolistId]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el,
                    isDone: action.isDone
                } : el)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el,
                    title: action.title
                } : el)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolistId]: []
            }
        case "REMOVE-TODOLIST":
            let copyState = state
            delete copyState[action.todolistId]
            return copyState
        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', todolistId, taskId} as const
}
export const addTaskAC = (todolistId: string, title: string) => {
    return {type: 'ADD-TASK', todolistId, title} as const
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskId, isDone} as const
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title} as const
}

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>