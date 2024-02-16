import React, {useState} from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, {AlertProps} from '@mui/material/Alert'
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch, useAppSelector} from "../../state/strore";
import {setAppErrorAC} from "../../reducers/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export const CustomizedSnackbar = () => {
    // const [open, setOpen] = useState<string | null>('ERROR' || null)
    const error = useAppSelector<string | null>(state => state.app.error)

    const dispatch = useAppDispatch()
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }

    }
    return (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}
                  anchorOrigin={{
                      horizontal: 'left',
                      vertical: 'top'
                  }}>
            <Alert onClose={handleClose} severity='error' sx={{width: '100%'}}>
                {/*Error message 😠*/}
                {error}
            </Alert>
        </Snackbar>
    )
}
