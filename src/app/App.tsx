import React, {useCallback, useEffect} from 'react';
import './App.css';
import Container from '@mui/material/Container/Container';
import {useAppSelector} from "../state/store";
import {TaskType} from "../api/todolists-api";
import {CustomizedSnackbar} from "../components/ErrorSnackbar/CustomizedSnackbar";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from '@mui/material/IconButton/IconButton';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {LinearProgress} from "@mui/material";
import {TodolistsList} from "../features/TodolistList/TodolistList";
import {RequestStatusType} from "../reducers/app-reducer";
import {Menu} from "@mui/icons-material";
import {Header} from "../components/Header";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const App = () => {
    const status = useAppSelector<RequestStatusType>((state) => state.app.status)
    return (
        <div className="App">
            <CustomizedSnackbar/>
            <Header/>
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    );
}
