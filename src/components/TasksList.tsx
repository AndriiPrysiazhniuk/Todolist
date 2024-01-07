import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import React, {useCallback} from "react";
import {TaskStatuses, TaskType, UpdateTaskModelType} from "../api/todolist-api";

type PropsType = {
    todolistId: string
    task: TaskType
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, model: UpdateTaskModelType) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
}

export const TasksList = (props: PropsType) => {
    const {todolistId, task, removeTask, changeTaskStatus, changeTaskTitle} = props

    const removeTaskHandler = useCallback(() => removeTask(todolistId, task.id), [removeTask, todolistId, task.id])
    const changeTaskStatusHandler = useCallback(() => changeTaskStatus(todolistId, task.id, task), [changeTaskStatus, task, todolistId, task.id])
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