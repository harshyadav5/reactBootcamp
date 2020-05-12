import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionTypes from '../../Store/action';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler'


class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        // ingredients: {
        //     salad: 0,
        //     bacon: 0,
        //     cheese: 0,
        //     meat: 0
        // },
        /*Now we are fitching ingredients from firebase database*/
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }
    componentDidMount () {
        console.log('Burger Will gets Mounted');
        // axios.get('https://burger-builder-5c86f.firebaseio.com/ingredients.json')
        // .then(response => {
        //     this.setState({ingredients: response.data});
        // })
        // .catch(error => {this.setState({error: true})});
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0 
    }
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }


    render () {
        const disabledInfo = {
            ...this.props.ings
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;

        // {salad: true, meat: false, ...}
        //Only when purchasing is true modal is visible 
        /*purchaseCancelled and purchaseContinued are used as an action for button 
        type in OrderSummary component*/

        let burger = this.state.error ?<p>Ingredients can not be loaded!</p> : <Spinner />
        if(this.props.ings){
            burger = (
                <Aux>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                ingredientAdded={this.props.onIngredientAdded}
                ingredientRemoved={this.props.onIngredientRemove}
                disabled={disabledInfo}
                purchasable={this.updatePurchaseState(this.props.ings)}
                ordered={this.purchaseHandler}
                price={this.props.price} />
                </Aux>
            );
            orderSummary = <OrderSummary 
                ingredients={this.props.ings} 
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}/>
        }
        if(this.state.loading){
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings : state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName:ingName}),
        onIngredientRemove: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName:ingName})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));