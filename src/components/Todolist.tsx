import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "../App";
import styles from '../todolist.module.css'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

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
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
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
    const changeTodolistTitleHandler = (newTitle: string) => {
        changeTodolistTitle(id, newTitle)
    }
    return (
        <div>
            <h3>
                <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
                <IconButton onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>
<<<<<<< HEAD
=======

>>>>>>> aad54870e7e1c8c5d77cb75c3e55744128cd9e1a
            <AddItemForm addItem={addTaskHandler}/>
            <div>
                {tasks.map((el) => {
                    const removeTaskHandler = () => {
                        removeTask(props.id, el.id)
                    }
                    const changeTaskStatusHandler = () => {
<<<<<<< HEAD
=======

>>>>>>> aad54870e7e1c8c5d77cb75c3e55744128cd9e1a
                        changeTaskStatus(props.id, el.id, el.isDone)
                    }
                    const changeTaskTitleHandler = (newTitle: string) => {
                        changeTaskTitle(props.id, el.id, newTitle)
                    }
                    return (
                        <div key={el.id} className={el.isDone ? styles.isDone : ''}>
                            <Checkbox onChange={changeTaskStatusHandler} checked={el.isDone}/>
<<<<<<< HEAD
                            <EditableSpan onChange={changeTaskTitleHandler} value={el.title}/>
=======

                            <EditableSpan onChange={changeTaskTitleHandler} value={el.title}/>

>>>>>>> aad54870e7e1c8c5d77cb75c3e55744128cd9e1a
                            <IconButton onClick={removeTaskHandler}>
                                <Delete/>
                            </IconButton>

                        </div>
                    )
                })}
<<<<<<< HEAD
=======

>>>>>>> aad54870e7e1c8c5d77cb75c3e55744128cd9e1a
            </div>
            <div>
                <Button variant={filter === 'all' ? 'outlined' : 'text'}
                        color={'inherit'} onClick={() => onFilterBtnClickHandler('all')}>All
                </Button>
                <Button variant={filter === 'active' ? 'outlined' : 'text'}
                        color={'primary'} onClick={() => onFilterBtnClickHandler('active')}>Active
                </Button>
                <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                        color={'error'} onClick={() => onFilterBtnClickHandler('completed')}>Completed
                </Button>
            </div>
        </div>
    )
}

