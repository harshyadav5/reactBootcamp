import * as actionTypes from './ActionTypes';

export const saveResult = (value) => {
    //console.log('Save Result Called')

    //const updatedValue = value*2;
    return{
        type: actionTypes.STORE_RESULT,
        result:value
    }
}
export const storeResult = (value) => {
    //console.log('Stored Result Called')
    return (dispatch, getState) => {
        setTimeout(() =>{
            //const oldCounter = getState().ctr.counter;
            //console.log(oldCounter);
            dispatch(saveResult(value))
        },2000);
    }
}
export const remove = (value) => {
    console.log('Remove Numner is called')
    return{
        type: actionTypes.DELETE,
        resultElId:value
    }
}