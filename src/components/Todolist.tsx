import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "../App";
import styles from '../todolist.module.css'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    id: string
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    changeTodolistTitle:(todolistId:string, newTitle:string)=>void
    addTask: (todolistId: string, title: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterValuesType) => void
    removeTodolist: (todolistId: string) => void
    filter: FilterValuesType
    tasks: TaskType[]
}
export const Todolist = (props: PropsType) => {
    const {
        title,
        id,
        changeTaskStatus,
        changeTodolistTitle,
        changeTaskTitle,
        addTask,
        removeTask,
        changeFilter,
        removeTodolist,
        filter,
        tasks
    } = props


    const onFilterBtnClickHandler = (filter: FilterValuesType) => {
        changeFilter(id, filter)
    }
    const addTaskHandler = (title: string) => {
        addTask(props.id, title)
    }
    const removeTodolistHandler = () => {
        removeTodolist(id)
    }
const changeTodolistTitleHandler=(newTitle:string)=>{
changeTodolistTitle(id, newTitle)
}
    return (
        <div>
            {/*<h3>{props.title}</h3>*/}
            <div>
                <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
                <button onClick={removeTodolistHandler}>X</button>
            </div>

            <AddItemForm addItem={addTaskHandler}/>
            <ul>
                {tasks.map((el) => {
                    const removeTaskHandler = () => {
                        removeTask(props.id, el.id)
                    }
                    const changeTaskStatusHandler = () => {

                        changeTaskStatus(props.id, el.id, el.isDone)
                    }
                    const changeTaskTitleHandler = (newTitle: string) => {
                        changeTaskTitle(props.id, el.id, newTitle)
                    }
                    return (
                        <li key={el.id} className={el.isDone ? styles.isDone : ''}>
                            <input onChange={changeTaskStatusHandler} type="checkbox" checked={el.isDone}/>
                            <EditableSpan onChange={changeTaskTitleHandler} value={el.title}/>
                            <button onClick={removeTaskHandler}>✖️</button>

                        </li>
                    )
                })}

            </ul>
            <div>
                <button className={filter === 'all' ? styles.activeFilter : ''}
                        onClick={() => onFilterBtnClickHandler('all')}>All
                </button>
                <button className={filter === 'active' ? styles.activeFilter : ''}
                        onClick={() => onFilterBtnClickHandler('active')}>Active
                </button>
                <button className={filter === 'completed' ? styles.activeFilter : ''}
                        onClick={() => onFilterBtnClickHandler('completed')}>Completed
                </button>
            </div>
        </div>
    )
}

