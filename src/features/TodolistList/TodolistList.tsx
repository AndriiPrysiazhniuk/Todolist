import React, {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../state/store";
import {
    addTaskTC,
    changeTaskStatusTC,
    changeTaskTitleTC,
    removeTaskTC
} from "../../reducers/tasks-reducer";
import {
    addTodolistsTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC, FilterValuesType,
    removeTodolistsTC, TodolistDomainType
} from "../../reducers/todolist-reducer";
import {TasksStateType} from "../../app/App";
import {TaskStatuses} from "../../api/todolists-api";
import Grid from "@mui/material/Grid/Grid";
import {AddItemForm} from "../../components/AddItemForm";
import Paper from "@mui/material/Paper/Paper";
import {Todolist} from "../../components/Todolist";


export const TodolistsList: React.FC = React.memo(() => {
    const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useAppSelector<TasksStateType>(state => state.tasks)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const thunk = fetchTodolistsTC()
        dispatch(thunk)
    }, [])

    const removeTask = useCallback(function (todolistId: string, id: string) {
        dispatch(removeTaskTC(todolistId, id))
    }, [])

    const addTask = useCallback(function (todolistId: string, title: string) {
        dispatch(addTaskTC(todolistId, title))
    }, [])

    const changeStatus = useCallback(function (todolistId: string, id: string, status: TaskStatuses) {
        dispatch(changeTaskStatusTC(todolistId, id, status))
    }, [])

    const changeTaskTitle = useCallback(function (todolistId: string, id: string, newTitle: string) {
        dispatch(changeTaskTitleTC(todolistId, id, newTitle))
    }, [])

    const changeFilter = useCallback(function (todolistId: string, value: FilterValuesType) {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [])

    const removeTodolist = useCallback(function (id: string) {
        const thunk = removeTodolistsTC(id)
        dispatch(thunk)
    }, [])

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        const thunk = changeTodolistTitleTC(id, title)
        dispatch(thunk)
    }, [])

    const addTodolist = useCallback((title: string) => {
        const thunk = addTodolistsTC(title)
        dispatch(thunk)
    }, [dispatch])
    return (
        <div>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id]

                        return <Grid item key={tl.id}>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    todolist={tl}
                                    tasks={allTodolistTasks}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </div>
    )
})