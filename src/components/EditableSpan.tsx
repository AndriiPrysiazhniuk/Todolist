import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@mui/material";


type EditableSpanPropsType = {
    value: string
    onChange: (newTitle: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    const {value, onChange} = props
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(value)
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const setEditModeHandler = () => {
        setEditMode(true)
        setTitle(value)
    }
    const activateViewMode = () => {
        setEditMode(false)
        onChange(title)
    }
    const activateViewModeOnClick = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            setEditMode(false)
            onChange(title)
        }
    }
    return editMode
        ? <TextField type="text" onChange={onChangeInputHandler} value={title} onKeyDown={activateViewModeOnClick}
                     onBlur={activateViewMode}
                     autoFocus/>
        : <span onDoubleClick={setEditModeHandler}>{value}</span>
}