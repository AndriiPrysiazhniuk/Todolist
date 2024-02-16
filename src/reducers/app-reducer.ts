export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'succeeded' as RequestStatusType,
    error: null as null | string
}

type InitialStateType = typeof initialState
export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>

export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case'APP/SET-STATUS':
            return {...state, status: action.status}
        case'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
}

type ActionType = SetAppStatusACType | SetAppErrorACType

export const setAppStatusAC = (status: RequestStatusType) => {
    return {type: 'APP/SET-STATUS', status} as const
}
export const setAppErrorAC = (error: string | null) => {
    return {type: 'APP/SET-ERROR', error} as const
}

