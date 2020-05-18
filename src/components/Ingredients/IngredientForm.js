import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';
import LoadingIndicator from '../UI/LoadingIndicator';

const IngredientForm = React.memo(props => {

  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');

  const submitHandler = event => {
    event.preventDefault();
    props.onAddIngredient({title: enteredTitle, amount: enteredAmount});
    // ...
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input 
            type="text" 
            id="title"
            value={enteredTitle}
            onChange={event => {
                //const newTitle = event.target.value;    //react events are not DOM event these are synthetic events
                // setInputState( pervInputState => ({     //so instead of creating new event object for every key stroke 
                //   title: newTitle,           //it will use the previos event object ,so for second key stroke
                //   amount:pervInputState.amount        // we will use the previos key stroke value
                // }))
                setEnteredTitle(event.target.value);
              }
             } />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input 
            type="number" 
            id="amount"
            value={enteredAmount}
            onChange={event => {
                // const newAmount = event.target.value;
                // setInputState(pervInputState => ({
                //   title:pervInputState.title,
                //   amount: newAmount        //we are using closure here so perv event wiil get locked
                //  }))
                setEnteredAmount(event.target.value);
                }                     // for that store amount value initially before closure
                 } />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading ? <LoadingIndicator /> : null}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
