import React, {useCallback} from "react";
import {FilterValuesType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TasksList} from "./TasksList";

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
export const Todolist = React.memo((props: PropsType) => {

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


    const onFilterBtnClickHandler = useCallback((filter: FilterValuesType) => {
        changeFilter(id, filter)
    }, [changeFilter, id])
    const addTaskHandler = useCallback((title: string) => {
        addTask(id, title)
    }, [addTask, id])
    const removeTodolistHandler = () => {
        removeTodolist(id)
    }
    const changeTodolistTitleHandler = useCallback((newTitle: string) => {
        changeTodolistTitle(id, newTitle)
    }, [changeTodolistTitle, id])

    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(el => !el.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(el => el.isDone)
    }
    return (
        <div>
            <h3>
                <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
                <IconButton onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            <div>
                {tasksForTodolist.map((el) => {
                    return (
                        <TasksList key={el.id}
                                   isDone={el.isDone}
                                   title={el.title}
                                   todolistId={props.id}
                                   taskId={el.id}
                                   removeTask={removeTask}
                                   changeTaskStatus={changeTaskStatus}
                                   changeTaskTitle={changeTaskTitle}/>
                    )
                })}
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
})