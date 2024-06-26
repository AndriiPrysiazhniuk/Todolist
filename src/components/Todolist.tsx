import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "../components/Task";
import {fetchTasksTC} from "../reducers/tasks-reducer";
import {TaskStatuses, TaskType} from "../api/todolists-api";
import {FilterValuesType, TodolistDomainType} from "../reducers/todolist-reducer";
import {useAppDispatch} from "../state/store";


type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, id: string, status: TaskStatuses) => void
    changeTaskTitle: (todolistId: string, id: string, newTitle: string) => void
    removeTask: (todolistId: string, id: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}
export const Todolist: React.FC<PropsType> = React.memo(({...props}) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchTasksTC(props.todolist.id))
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(props.todolist.id, title)
    }, [props.addTask, props.todolist.id])

    const removeTodolist = () => {
        props.removeTodolist(props.todolist.id)
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolist.id, title)
    }, [props.todolist.id, props.changeTodolistTitle])

    const onAllClickHandler = useCallback(() => props.changeFilter(props.todolist.id, 'all'), [props.todolist.id, props.changeFilter])
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.todolist.id, 'active'), [props.todolist.id, props.changeFilter])
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todolist.id, 'completed'), [props.todolist.id, props.changeFilter])


    let tasksForTodolist = props.tasks

    if (props.todolist.filter === 'active') {
        console.log(props.todolist)
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    if (props.todolist.filter === 'completed') {
        console.log(tasksForTodolist)
    }
    return (
        <div>
            <h3><EditableSpan value={props.todolist.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
            <div>
                {
                    tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={props.todolist.id}
                                                    removeTask={props.removeTask}
                                                    changeTaskTitle={props.changeTaskTitle}
                                                    changeTaskStatus={props.changeTaskStatus}
                    />)
                }
            </div>
            <div style={{paddingTop: '10px'}}>
                <Button variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
                        onClick={onAllClickHandler}
                        color={'inherit'}
                >All
                </Button>
                <Button variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
                        onClick={onActiveClickHandler}
                        color={'primary'}>Active
                </Button>
                <Button variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={onCompletedClickHandler}
                        color={'secondary'}>Completed
                </Button>
            </div>
        </div>
    )
})