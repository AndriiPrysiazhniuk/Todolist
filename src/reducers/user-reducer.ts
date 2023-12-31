import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

type StateType = {
    age: number
    childrenCount: number
    name: string

}
type ActionType = {
    type: string
    [key: string]: any
}

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const userReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            return {...state, age: state.age + 1}
        case 'INCREMENT-CHILDREN-COUNT':

            return {...state, childrenCount: state.childrenCount + 1}
        case 'CHANGE-NAME':
            const newName = 'Viktor'
            return {...state, name: state.name = newName}
        default:
            throw new Error('I don`t Understand this type')
    }
}

