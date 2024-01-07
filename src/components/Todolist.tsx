import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TasksList} from "./TasksList";
import {fetchTasksTC} from "../reducers/tasks-reducer";
import {TaskStatuses, TaskType, UpdateTaskModelType} from "../api/todolist-api";
import {FilterValuesType} from "../reducers/todolist-reducer";
import {useAppDispatch} from "../state/strore";


type PropsType = {
    title: string
    id: string
    changeTaskStatus: (todolistId: string, taskId: string, model: UpdateTaskModelType) => void
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
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchTasksTC(id))
    }, [])

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
        tasksForTodolist = tasksForTodolist.filter(el => el.status === TaskStatuses.Completed)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(el => el.status === TaskStatuses.Completed)
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
                                   todolistId={props.id}
                                   task={el}
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