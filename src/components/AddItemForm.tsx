<<<<<<< HEAD
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";



type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required 😣");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>
        <TextField variant="outlined"
                   error={!!error}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   label="Title"
                   helperText={error}
        />
        <IconButton color="primary" onClick={addItem}>
            <AddBox />
        </IconButton>
    </div>
}
=======
import styles from "../todolist.module.css";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
    const {addItem} = props

    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState<string | null>(null)
    const onEnterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            addItem(inputValue.trim())
            setInputValue('')
        } else {
            setError('Title is Required 😣')
        }
    }
    const handleInputChanges = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
        setError(null)
    }
    const addTaskHandler = () => {
        if (inputValue.trim() !== '') {
            addItem(inputValue.trim())
            setInputValue('')
        } else {
            setError('Title is Required 😣')
        }
    }
    return (
        <div>
            <TextField error={!!error} onKeyDown={onEnterPressHandler}
                       onChange={handleInputChanges}
                       value={inputValue} variant={'outlined'} label={'title'} helperText={error} size={'small'}/>
            <IconButton color={'primary'}
                        onClick={addTaskHandler}>
                <AddBox/>
            </IconButton>
            {/*<p className={error ? styles.errorMessage : ''}>{error}</p>*/}
        </div>
    )
}
>>>>>>> aad54870e7e1c8c5d77cb75c3e55744128cd9e1a
