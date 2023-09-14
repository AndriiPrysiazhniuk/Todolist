import React from 'react';
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
    removeTodolistAC
} from "./reducers/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/strore";

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

    const removeTask = (todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    }
    const addTask = (todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }
    const changeTaskStatus = (todolistId: string, taskId: string, newIsDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, newIsDone))
    }
    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
    }
    const changeFilter = (todolistId: string, filterValue: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, filterValue))
    }
    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }
    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle))
    }
    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    return (
        <div>
            <Header/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>

                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(el => {
                        let tasksForTodolist = tasks[el.id]

                        if (el.filter === 'active') {
                            tasksForTodolist = tasksForTodolist.filter(el => !el.isDone)
                        }
                        if (el.filter === 'completed') {
                            tasksForTodolist = tasksForTodolist.filter(el => el.isDone)
                        }
                        return (<Grid item key={el.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist id={el.id}
                                              title={el.title}
                                              tasks={tasksForTodolist}
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
