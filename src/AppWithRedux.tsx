import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";

import {AddItemForm} from "./components/AddItemForm";
import {Header} from "./components/Header";
import Container from '@mui/material/Container/Container';
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC, setTodolistAC
} from "./reducers/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/strore";
import {todolistApi} from "./api/todolist-api";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const AppWithRedux = () => {
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(()=>{
        todolistApi.getTodolist()
            .then((res)=>{
                dispatch(setTodolistAC(res.data))
            })
    }, [])

    const removeTask = useCallback((todolistId: string, taskId: string) => dispatch(removeTaskAC(todolistId, taskId)), [dispatch])
    const addTask = useCallback((todolistId: string, title: string) => dispatch(addTaskAC(todolistId, title)), [dispatch])
    const changeTaskStatus = useCallback((todolistId: string, taskId: string, newIsDone: boolean) => dispatch(changeTaskStatusAC(todolistId, taskId, !newIsDone)), [dispatch])
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, newTitle: string) => dispatch(changeTaskTitleAC(todolistId, taskId, newTitle)), [dispatch])
    const changeFilter = useCallback((todolistId: string, filterValue: FilterValuesType) => dispatch(changeTodolistFilterAC(todolistId, filterValue)), [dispatch])
    const removeTodolist = useCallback((todolistId: string) => dispatch(removeTodolistAC(todolistId)), [dispatch])
    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => dispatch(changeTodolistTitleAC(todolistId, newTitle)), [dispatch])
    const addTodolist = useCallback((title: string) => dispatch(addTodolistAC(title)), [dispatch])


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
