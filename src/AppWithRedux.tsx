import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";

import {AddItemForm} from "./components/AddItemForm";
import {Header} from "./components/Header";
import Container from '@mui/material/Container/Container';
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';
import {
    addTaskTC,
    changeTaskStatusTC,
    changeTaskTitleTC,
    removeTaskTC
} from "./reducers/tasks-reducer";
import {
    addTodolistsTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC, fetchTodolistsTC, FilterValuesType, removeTodolistsTC, TodolistDomainType
} from "./reducers/todolist-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./state/strore";
import {TaskStatuses, TaskType} from "./api/todolists-api";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const AppWithRedux = () => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [dispatch])

    const removeTask = useCallback((todolistId: string, taskId: string) => dispatch(removeTaskTC(todolistId, taskId)), [dispatch])
    const addTask = useCallback((todolistId: string, title: string) => dispatch(addTaskTC(todolistId, title)), [dispatch])
    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => dispatch(changeTaskStatusTC(todolistId, taskId, status)), [dispatch])
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, newTitle: string) => dispatch(changeTaskTitleTC(todolistId, taskId, newTitle)), [dispatch])
    const changeFilter = useCallback((todolistId: string, filterValue: FilterValuesType) => dispatch(changeTodolistFilterAC(todolistId, filterValue)), [dispatch])
    const removeTodolist = useCallback((todolistId: string) => dispatch(removeTodolistsTC(todolistId)), [dispatch])
    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => dispatch(changeTodolistTitleTC(todolistId, newTitle)), [dispatch])
    const addTodolist = useCallback((title: string) => dispatch(addTodolistsTC(title)), [dispatch])


    return (
        <div>
            <Header/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>

                    {todolists.map(el => {
                        return (<Grid item key={el.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist id={el.id}
                                              title={el.title}
                                              tasks={tasks[el.id]}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeTaskStatus={changeTaskStatus}
                                              changeTaskTitle={changeTaskTitle}
                                              changeTodolistTitle={changeTodolistTitle}
                                              removeTodolist={removeTodolist}
                                              filter={el.filter}/>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}
