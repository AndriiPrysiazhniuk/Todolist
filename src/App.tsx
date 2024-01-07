export {}
// import React, {useState} from 'react';
// import './App.css';
// import {TaskType, Todolist} from "./components/Todolist";
// import {v1} from "uuid";
// import {AddItemForm} from "./components/AddItemForm";
// import {Header} from "./components/Header";
// import Container from '@mui/material/Container/Container';
// import Grid from '@mui/material/Grid/Grid';
// import Paper from '@mui/material/Paper/Paper';
//
// export type FilterValuesType = 'all' | 'active' | 'completed'
// export type TodolistType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }
// export type TasksStateType = {
//     [key: string]: Array<TaskType>
// }
//
// export const App = () => {
//     let todolistID1 = v1()
//     let todolistID2 = v1()
//
//     let [todolists, setTodolists] = useState<Array<TodolistType>>([
//         {id: todolistID1, title: 'What to learn', filter: 'all'},
//         {id: todolistID2, title: 'What to buy', filter: 'all'},
//     ])
//     let [tasks, setTasks] = useState<TasksStateType>({
//         [todolistID1]: [
//             {id: v1(), title: 'HTML&CSS', isDone: true},
//             {id: v1(), title: 'JS', isDone: true},
//             {id: v1(), title: 'ReactJS', isDone: false},
//
//         ],
//         [todolistID2]: [
//             {id: v1(), title: 'Rest API', isDone: true},
//             {id: v1(), title: 'GraphQL', isDone: false},
//         ]
//     })
//
//     const removeTask = (todolistId: string, taskId: string) => {
//         setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})
//     }
//     const addTask = (todolistId: string, title: string) => {
//         const newTask = {id: v1(), title: title, isDone: false}
//         tasks[todolistId] = [newTask, ...tasks[todolistId]]
//         setTasks({...tasks})
//     }
//     const changeTaskStatus = (todolistId: string, taskId: string, newIsDone: boolean) => {
//         setTasks({
//             ...tasks,
//             [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: !newIsDone} : el)
//         })
//     }
//     const changeFilter = (todolistId: string, filterValue: FilterValuesType) => {
//         setTodolists(todolists.map(el => (el.id === todolistId ? {...el, filter: filterValue} : el)))
//     }
//
//     const removeTodolist = (todolistId: string) => {
//         setTodolists(todolists.filter(el => el.id !== todolistId))
//     }
//     const addTodolist = (title: string) => {
//         const newTodolistId = v1()
//         const newTodolist: TodolistType = {id: newTodolistId, title: title, filter: 'all'}
//         setTodolists([...todolists, newTodolist])
//         setTasks({...tasks, [newTodolistId]: []})
//     }
//     const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
//         setTasks({
//             ...tasks,
//             [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, title: newTitle} : el)
//         })
//     }
//     const changeTodolistTitle = (todolistId: string, newTitle: string) => {
//         setTodolists(todolists.map(el => el.id === todolistId ? {...el, title: newTitle} : el))
//     }
//     return (
//         <div>
//             <Header/>
//             <Container fixed>
//                 <Grid container style={{padding: '20px'}}>
//
//                     <AddItemForm addItem={addTodolist}/>
//                 </Grid>
//                 <Grid container spacing={3}>
//                     {todolists.map(el => {
//                         let tasksForTodolist = tasks[el.id]
//
//                         if (el.filter === 'active') {
//                             tasksForTodolist = tasksForTodolist.filter(el => !el.isDone)
//                         }
//                         if (el.filter === 'completed') {
//                             tasksForTodolist = tasksForTodolist.filter(el => el.isDone)
//                         }
//                         return (<Grid item key={el.id}>
//                                 <Paper style={{padding: '10px'}}>
//                                     <Todolist id={el.id}
//                                               title={el.title}
//                                               tasks={tasksForTodolist}
//                                               removeTask={removeTask}
//                                               changeFilter={changeFilter}
//                                               addTask={addTask}
//                                               changeTaskStatus={changeTaskStatus}
//                                               changeTaskTitle={changeTaskTitle}
//                                               changeTodolistTitle={changeTodolistTitle}
//                                               removeTodolist={removeTodolist}
//                                               filter={el.filter}/>
//                                 </Paper>
//                             </Grid>
//                         )
//                     })}
//                 </Grid>
//             </Container>
//         </div>
//     );
// }
