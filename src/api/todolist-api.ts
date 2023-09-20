import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'dada089b-9c27-4b97-b895-a363f6836eb8'
    }
})

export const todolistApi = {
    getTodolist() {

        return instance.get<Array<TodolistResponseType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistResponseType }>>('todo-lists', {title: title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, newTitle: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: newTitle})
    },
    getTasks(todolistId: string) {
        return instance.get(`/todo-lists/${todolistId}/tasks`)
    },
    createTasks(todolistId: string) {
        return instance.post(`/todo-lists/${todolistId}/tasks`)
    },
    deleteTasks(todolistId: string, taskId: string) {
        return instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTasks(todolistId: string, taskId: string) {
        return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },

}

export type TodolistResponseType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

