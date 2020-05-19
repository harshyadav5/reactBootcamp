import React, { useState, useEffect, useCallback } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as burgerBuilderAction from '../../Store/action/indexAction';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler'

/*Converted To Functional Component*/

 const BurgerBuilder = props => {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
   const [purchasing, setPurchasing] = useState(false)

   const dispatch = useDispatch()

   const ings = useSelector(state => {
       return state.burgerBuilder.ingredients;
   })
   const price = useSelector(state => state.burgerBuilder.totalPrice)
   const error = useSelector(state => state.burgerBuilder.error)
   const isAuthenticated = useSelector(state => state.auth.token !== null)

   const onIngredientAdded= (ingName) => dispatch(burgerBuilderAction.addIngredients(ingName));
   const onIngredientRemove= (ingName) => dispatch(burgerBuilderAction.removeIngredients(ingName));
   const onInitIngredients= useCallback(() => dispatch(burgerBuilderAction.initIngredients()), [dispatch]);
   const onInitPurchase= () => dispatch(burgerBuilderAction.purchaseInit());
   const onSetRedirectPath= (path) => dispatch(burgerBuilderAction.setAuthRedirectPath(path));

   useEffect(() => {
    onInitIngredients()
   }, [onInitIngredients])
   
   const updatePurchaseState = (ingredients) => {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0 
    }

    const purchaseHandler = () => {
        if(isAuthenticated){
            setPurchasing(true);
        }
        else{
            onSetRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    }

        const disabledInfo = {
            ...ings
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;

        // {salad: true, meat: false, ...}
        //Only when purchasing is true modal is visible 
        /*purchaseCancelled and purchaseContinued are used as an action for button 
        type in OrderSummary component*/

        let burger = error ?<p>Ingredients can not be loaded!</p> : <Spinner />
        if(ings){
            burger = (
                <Aux>
                <Burger ingredients={ings} />
                <BuildControls
                ingredientAdded={onIngredientAdded}
                ingredientRemoved={onIngredientRemove}
                disabled={disabledInfo}
                purchasable={updatePurchaseState(ings)}
                ordered={purchaseHandler}
                isAuth={isAuthenticated}
                price={price} />
                </Aux>
            );
            orderSummary = <OrderSummary 
                ingredients={ings} 
                price={price}
                purchaseCancelled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}/>
        }
        // if(this.state.loading){    //don't need this spinner now because we are not performing any async operations
        //     orderSummary = <Spinner />;
        // }

        return (
            <Aux>
                <Modal 
                show={purchasing} 
                modalClosed={purchaseCancelHandler} >
                   {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
}

export default withErrorHandler(BurgerBuilder, axios);