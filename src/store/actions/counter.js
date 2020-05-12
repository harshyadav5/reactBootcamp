import * as actionTypes from './ActionTypes';

export const increment = () => {
    return{
        type: actionTypes.INCREMENT
    }
}
export const decrement = () => {
    return{
        type: actionTypes.DECREMENT
    }
}
export const add = (value) => {
    return{
        type: actionTypes.ADD,
        count:value
    }
}
export const subtract = (value) => {
    return{
        type: actionTypes.SUBTRACT,
        count:value
    }
}