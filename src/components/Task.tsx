import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import React, {ChangeEvent, useCallback} from "react";
import {TaskStatuses, TaskType} from "../api/todolists-api";

type PropsType = {
    todolistId: string
    task: TaskType
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
}

export const Task = (props: PropsType) => {
    const {todolistId, task, removeTask, changeTaskStatus, changeTaskTitle} = props

    const removeTaskHandler = useCallback(() => removeTask(todolistId, task.id), [removeTask, todolistId, task.id])
    const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.checked)
        changeTaskStatus(todolistId, task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New);
    }, [changeTaskStatus, task, todolistId])
    const changeTaskTitleHandler = useCallback((newTitle: string) => changeTaskTitle(todolistId, task.id, newTitle), [changeTaskTitle, todolistId, task.id])
    return (
        <div className={task.status === TaskStatuses.Completed ? 'task' : ''}>
            <Checkbox checked={task.status === TaskStatuses.Completed}
                // color={'primary'}
                      onChange={changeTaskStatusHandler}/>
            <EditableSpan onChange={changeTaskTitleHandler} value={task.title}/>
            <IconButton onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
}