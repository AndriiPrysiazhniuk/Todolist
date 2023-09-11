import styles from "../todolist.module.css";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
    const {addItem} = props

    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState<string | null>(null)
    const onEnterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            addItem( inputValue.trim())
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
            addItem( inputValue.trim())
            setInputValue('')
        } else {
            setError('Title is Required 😣')
        }
    }
    return (
        <div>
            <input className={error ? styles.error : ''} onKeyDown={onEnterPressHandler}
                   onChange={handleInputChanges} value={inputValue}/>
            <button onClick={addTaskHandler}>+</button>
            <p className={error ? styles.errorMessage : ''}>{error}</p>
        </div>
    )
}