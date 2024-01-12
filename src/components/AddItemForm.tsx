import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    const {addItem} = props

    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState<string | null>(null)
    const onEnterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            addItem(inputValue.trim())
            setInputValue('')
        }
        if (inputValue === '') {
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
        <div style={{'marginBottom': '10px'}}>
            <TextField error={!!error}
                       onKeyDown={onEnterPressHandler}
                       onChange={handleInputChanges}
                       value={inputValue}
                       variant={'outlined'}
                       label={error ? error : 'Type your task'}
                       size={'small'}/>
            <IconButton color={'primary'}
                        onClick={addTaskHandler}>
                <AddBox/>
            </IconButton>
            {/*<p className={error ? styles.errorMessage : ''}>{error}</p>*/}
        </div>
    )
})