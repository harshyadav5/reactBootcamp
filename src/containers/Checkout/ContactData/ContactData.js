import React, {useState} from 'react';
import {connect} from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/WithErrorHandler';
import * as actions from '../../../Store/action/indexAction';
import {updatedObject,checkValidity} from '../../../shared/utility';

/*Converted To Functional Component*/
const ContactData = props => {

    const [orderForm, setOrderForm] = useState({
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false
            }   ,
            street:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false
            },
            zipCode:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value:'',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'country'
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false
            },
            deliveryMode: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value:'fastest', displayValue: 'Fastest'},
                        {value:'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value:'Fastest',
                validation: {},
                valid:true
            }
        })
        const [formIsValid, setFormIsValid] =useState(false)
    

    /*event.preventDefault() is used to send the request and to reload the page*/
    const orderHandler = (event) => {
        event.preventDefault();

        const formData={};
        for(let formElementIdentifier in orderForm){
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: props.formData,
            userId: props.userId
        }
        props.onOrderBurger(order,props.token)
 
    }
    

    const inputChangedHandler = (event,inputIdentifier) => {

        const updatedFormElement = updatedObject(orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value,orderForm[inputIdentifier].validation),
            touched: true 
        });
        const updatedOrderForm = updatedObject(orderForm,{
            [inputIdentifier]: updatedFormElement
        });
        
        let formIsValid = true;

        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid);
    }

        const formElementsArray = [];
        for(let key in orderForm){
            formElementsArray.push({
                id:key,
                config: orderForm[key]
            });
        }

        let form = (
            <form onSubmit = {orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                    key = {formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(event) => inputChangedHandler(event,formElement.id)}/>
                ))}
                <Button btnType="Success" disabled={formIsValid}>ORDER</Button>
            </form>
        );
        // if ( this.props.loading ) {
        //     form = <Spinner />;
        // }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
     }

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapsDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))

    }
}
export default connect(mapStateToProps,mapsDispatchToProps)(withErrorHandler(ContactData,axios));