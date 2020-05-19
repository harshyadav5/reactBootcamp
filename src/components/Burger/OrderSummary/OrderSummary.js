import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = props => {

        const ingredientSummary = Object.keys(props.ingredients)
        .map( igkey => {
            return (
                //here key should be unique
                <li key={igkey}>  
                    <span style={{textTransform: 'capitalize'}}>{igkey}</span>
                    :{props.ingredients[igkey]}
                </li>);
        });
        return(
            <Aux>
                <h3>Your Order</h3>
                <p>A deleicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                 <p>
                     <strong>Total Price: {props.price.toFixed(2)}$</strong>
                 </p>
                <p>Continue To Checkout</p>
                <Button
                 btnType='Danger' 
                 clicked={props.purchaseCancelled}>CANCEL</Button>
                <Button 
                btnType='Success'
                 clicked={props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        );
}

export default orderSummary;