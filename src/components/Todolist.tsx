import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "../App";
import styles from '../todolist.module.css'

type TodolistType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title?: string
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    setFilter: (filter: FilterValuesType) => void
    filter: FilterValuesType
    tasks: TodolistType[]
}
export const Todolist = ({tasks, filter, setFilter, changeTaskStatus, addTask, removeTask}: PropsType) => {
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState<string | null>(null)

    const handleInputChanges = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
        setError(null)
    }
    const addTaskHandler = () => {
        if (inputValue.trim() !== '') {
            addTask(inputValue.trim())
            setInputValue('')
        } else {
            setError('Title is Required 😣')
        }
    }
    const onEnterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            addTask(inputValue.trim())
            setInputValue('')
        } else {
            setError('Title is Required 😣')
        }
    }
    const onFilterBtnClickHandler = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    return (
        <div>
            <h3>What to learn</h3>
            <div>
                <input className={error ? styles.error : ''} onKeyDown={onEnterPressHandler}
                       onChange={handleInputChanges} value={inputValue}/>
                <button onClick={addTaskHandler}>+</button>
                <p className={error ? styles.errorMessage : ''}>{error}</p>
            </div>
            <ul>
                {tasks.map((el) => {
                    const removeTaskHandler = () => {
                        removeTask(el.id)
                    }
                    const changeTaskStatusHandler = () => {
                        changeTaskStatus(el.id, el.isDone)
                    }
                    return (
                        <li key={el.id} className={el.isDone ? styles.isDone : ''}>
                            <input onChange={changeTaskStatusHandler} type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
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