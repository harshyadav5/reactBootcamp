import React , { useState, useEffect } from 'react';

import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../Store/action/indexAction';
import {updatedObject,checkValidity} from '../../shared/utility';

/*Converted To Functional Component*/
const Auth = props => {
    const [authForm, setAuthForm] = useState( {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value:'',
                validation: {
                    required: true,
                    isEmail:true
                },
                valid: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value:'',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }   
        })
        const [isSignup, setIsSignup] = useState(true)

        const {buildingBurger, authRedirectPath,onSetAuthRedirectPath} = props;
    /*if redirected to this page and not building burger , 
    we need to change buildingBurger Property*/
    
    useEffect(() => {
    /*it means we are trying to reach to checkout even we are not building a burger*/
      if(!buildingBurger && authRedirectPath !=='/'){
            onSetAuthRedirectPath()
    }
    }, [buildingBurger,authRedirectPath,onSetAuthRedirectPath])

    const inputChangedHandler = (event,controlName) => {
        const updatedControls = updatedObject(authForm,{
            [controlName]: updatedObject(authForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[controlName].validation),
                touched: true   
            })  
        });
        setAuthForm(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(authForm.email.value, authForm.password.value, isSignup)
    }

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup)
    }

        const formElementsArray = [];
        for(let key in authForm){
            formElementsArray.push({
                id:key,
                config: authForm[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => inputChangedHandler(event,formElement.id)}
                />
        ));

        if(props.loading){  //Issue
            form = <Spinner />
        }

        let errorMessage = null;

        if(props.error) {
            errorMessage= (
            <p>{props.error.message}</p>
            );
        }

        let authRedirect = null;
        if(props.isAuthenticated){
            authRedirect = <Redirect to={props.authRedirectPath}/>
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button 
                    clicked={switchAuthModeHandler}
                    btnType="Danger">Switch To {isSignup ? 'SIGNIN' : 'SIGNUP'}
                    </Button>
            </div>
        )
}

const mapStateToProps = state => {
//    console.log("Auth Redirect Path  "+state.auth.authRedirectPath)
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password,isSignUp) => dispatch(actions.auth(email,password,isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))   
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);