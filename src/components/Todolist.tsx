import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "../App";
import styles from '../todolist.module.css'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    id: string
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
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
        addTask,
        removeTask,
        changeFilter,
        removeTodolist,
        filter,
        tasks
    } = props
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState<string | null>(null)

    const handleInputChanges = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
        setError(null)
    }
    const addTaskHandler = () => {
        if (inputValue.trim() !== '') {
            addTask(props.id, inputValue.trim())
            setInputValue('')
        } else {
            setError('Title is Required 😣')
        }
    }
    const onEnterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            addTask(props.id, inputValue.trim())
            setInputValue('')
        } else {
            setError('Title is Required 😣')
        }
    }
    const onFilterBtnClickHandler = (filter: FilterValuesType) => {
        changeFilter(id, filter)
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(id)
    }

    return (
        <div>
            <h3>{props.title }
                <button onClick={removeTodolistHandler}>X</button>
            </h3>
            <div>
                <input className={error ? styles.error : ''} onKeyDown={onEnterPressHandler}
                       onChange={handleInputChanges} value={inputValue}/>
                <button onClick={addTaskHandler}>+</button>
                <p className={error ? styles.errorMessage : ''}>{error}</p>
            </div>
            <ul>
                {tasks.map((el) => {
                    const removeTaskHandler = () => {
                        removeTask(props.id, el.id)
                    }
                    const changeTaskStatusHandler = () => {

                        changeTaskStatus(props.id, el.id, el.isDone)
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