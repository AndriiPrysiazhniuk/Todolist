import styles from "../todolist.module.css";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import React, {useCallback} from "react";

type PropsType = {
    isDone: boolean
    title: string
    todolistId: string
    taskId: string
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
}

export const TasksList = (props: PropsType) => {
    const {isDone, title, todolistId, taskId, removeTask, changeTaskStatus, changeTaskTitle} = props

    const removeTaskHandler = useCallback(() => removeTask(todolistId, taskId), [removeTask, todolistId, taskId])
    const changeTaskStatusHandler = useCallback(() => changeTaskStatus(todolistId, taskId, isDone), [changeTaskStatus, isDone, todolistId, taskId])
    const changeTaskTitleHandler = useCallback((newTitle: string) => changeTaskTitle(todolistId, taskId, newTitle), [changeTaskTitle, todolistId, taskId])
    return (
        <div className={isDone ? styles.isDone : ''}>
            <Checkbox onChange={changeTaskStatusHandler} checked={isDone}/>
            <EditableSpan onChange={changeTaskTitleHandler} value={title}/>
            <IconButton onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
}