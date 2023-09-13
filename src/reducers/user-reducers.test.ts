import {userReducer} from "./user-reducer";

test('user reducer should increment only age', () => {
const startState = {age:20, childrenCount:3, name:'Andrii'}
const endState = userReducer(startState, {type:'INCREMENT-AGE'})

    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(3)
})

test('user reducer should increment only childrenCount', () => {
const startState = {age:20, childrenCount:3, name:'Andrii'}
const endState = userReducer(startState, {type:'INCREMENT-CHILDREN-COUNT'})

    expect(endState.age).toBe(20)
    expect(endState.childrenCount).toBe(4)
})

test('user reducer should change user name', ()=>{
    const startState = {name:'Dimych', age:20, childrenCount:3}
    const newName = 'Viktor'
    const endState = userReducer(startState, {type:'CHANGE-NAME'})
})