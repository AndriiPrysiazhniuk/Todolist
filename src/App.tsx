import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(el => {
            return el.id !== taskId
        }))
    }
    const addTask = (title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks([...tasks, newTask])
    }
    const changeTaskStatus=(taskId:string,isDone:boolean)=>{
        console.log(isDone)
        setTasks(tasks.map(el=> el.id===taskId?{...el, isDone: !isDone}:el))
    }
    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(el => !el.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(el => el.isDone)
    }
    return (
        <div className="App">
            <Todolist  tasks={tasksForTodolist} filter={filter} setFilter={setFilter} changeTaskStatus={changeTaskStatus} addTask={addTask} removeTask={removeTask}/>
        </div>
    );
}

export default App;
