import React, {useCallback, useEffect} from 'react';
import './App.css';
import Container from '@mui/material/Container/Container';
import {useAppSelector} from "../state/store";
import {TaskType} from "../api/todolists-api";
import {CustomizedSnackbar} from "../components/ErrorSnackbar/CustomizedSnackbar";
import {RequestStatusType} from "../reducers/app-reducer";
import {Header} from "../components/Header";
import {Outlet} from "react-router-dom";
import {TodolistsList} from "../features/TodolistList/TodolistList";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const App = () => {
    return (
        <div className="App">
            <CustomizedSnackbar/>
            <Header/>
            <Container fixed>
                {/*<Outlet/>*/}
                <TodolistsList/>
            </Container>
        </div>
    );
}
