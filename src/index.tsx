import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from "../src/app/App";
import {store} from "../src/state/store";
import {Provider} from "react-redux";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Login} from "@mui/icons-material";
import {TodolistsList} from "../src/features/TodolistList/TodolistList";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '/login',
                element: <Login/>,
            },
            {
                path: '/todolists',
                element: <TodolistsList/>,
            }
        ]
    }
])

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals;

