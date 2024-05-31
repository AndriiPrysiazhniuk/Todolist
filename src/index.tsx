import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from "../src/app/App";
import {store} from "../src/state/store";
import {Provider} from "react-redux";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {Login} from "../src/features/Login/Login";
import {TodolistsList} from "../src/features/TodolistList/TodolistList";
import {ErrorPage} from "../src/components/ErrorPage/ErrorPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <Navigate to={'404'}/>,
        children: [
            {
                index: true,
                element: <Navigate to={'/todolists'}/>
            },
            {
                path: '/login',
                element: <Login/>,
            },
            {
                path: '/todolists',
                element: <TodolistsList/>,
            }
        ],
    },
    {
        path: '/404',
        element: <ErrorPage/>,
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

