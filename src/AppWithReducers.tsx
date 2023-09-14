import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {Header} from "./components/Header";
import Container from '@mui/material/Container/Container';
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./reducers/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./reducers/todolist-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const AppWithReducers = () => {
    let todolistID1 = v1()
    let todolistID2 = v1()


    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])
    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    const removeTask = (todolistId: string, taskId: string) => {
        dispatchToTasks(removeTaskAC(todolistId, taskId))
    }
    const addTask = (todolistId: string, title: string) => {
        dispatchToTasks(addTaskAC(todolistId, title))
    }
    const changeTaskStatus = (todolistId: string, taskId: string, newIsDone: boolean) => {
        dispatchToTasks(changeTaskStatusAC(todolistId, taskId, newIsDone))
    }
    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        dispatchToTasks(changeTaskTitleAC(todolistId, taskId, newTitle))
    }
    const changeFilter = (todolistId: string, filterValue: FilterValuesType) => {
        dispatchToTodolists(changeTodolistFilterAC(todolistId, filterValue))
    }
    const removeTodolist = (todolistId: string) => {
        dispatchToTodolists(removeTodolistAC(todolistId))
    }
    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        dispatchToTodolists(changeTodolistTitleAC(todolistId, newTitle))
    }
    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
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


