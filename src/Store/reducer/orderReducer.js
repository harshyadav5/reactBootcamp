import * as actionTypes from '../action/actionTypes';
import { updatedObject } from '../utility';
import { purchaseBurgerFail } from '../action/orderAction';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseInit = (state, action) => {
    updatedObject(state, {purchased: false})
}

const purchseBurgerStart = (state, action) => {
    return updatedObject(state, {loading: false})
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updatedObject(action.orderData,{id: action.orderId})
            
    return updatedObject(state,{
        
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder) 
    }) 
}

const purchaseBurgerFailed = (state, action) => {
    return updatedObject(state, {loading: false})
}

const fetchOrderStart = (state, action) => {
    return updatedObject(state, {loading: false})
}

const fetchOrderSuccess = (state, action) => {
    return updatedObject(state, {orders: action.orders, loading:true})
}

const fetchOrderFail = (state, action) => {
    return updatedObject(state, {loading: false})
}

const reducer = (state = initialState, action) => {

    switch(action.type){
        case actionTypes.PURCHASE_INIT: return purchaseInit(state,action)

        case actionTypes.PURCHASE_BURGER_START: return purchseBurgerStart(state, action)
           
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state,action)

        case actionTypes.PURCHASE_BURGER_FAIL:return purchaseBurgerFailed(state,action)

        case actionTypes.FETCH_ORDERS_START: return fetchOrderStart(state, action)

        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state, action)
   
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrderFail(state, action)

        default: return state
    }
}
export default reducer;