<<<<<<< HEAD
import TextField from '@mui/material/TextField/TextField';
import React, {ChangeEvent, useState} from 'react';
=======
import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

>>>>>>> aad54870e7e1c8c5d77cb75c3e55744128cd9e1a


type EditableSpanPropsType = {
    value: string
<<<<<<< HEAD
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ?    <TextField variant="outlined"
                        value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} />
        : <span onDoubleClick={activateEditMode}>{props.value}</span>
}
=======
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
    return editMode
        ? <TextField type="text" onChange={onChangeInputHandler} value={title} onBlur={activateViewMode}
                     autoFocus/>
        : <span onDoubleClick={setEditModeHandler}>{value}</span>
}
>>>>>>> aad54870e7e1c8c5d77cb75c3e55744128cd9e1a
