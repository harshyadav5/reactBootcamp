import React, {useState, useEffect, useCallback} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients =() => {

  const [userIngredients, setUserIngredients] = useState([]);

  // useEffect(() => {
  //   fetch('https://react-hooks-update-2a262.firebaseio.com/ingredients.json')
  //     .then(response => response.json())
  //     .then(responseData => {
  //       const loadedIngredients = [];
  //       for(const key in responseData){
  //         loadedIngredients.push({
  //           id: key,
  //           title: responseData[key].title,
  //           amount: responseData[key].amount
  //         })
  //       }
  //       //setUserIngredients(loadedIngredients);
  //     })
  // }, []);

  useEffect(() => {
    console.log('Rendering Ingredients', userIngredients)
  }, [userIngredients] );

  const filteredIngredientsHandler = useCallback( filteredIngredients => {
    setUserIngredients(filteredIngredients)
  },[]);

  const addIngredientsHandler = ingredient => {
    fetch('https://react-hooks-update-2a262.firebaseio.com/ingredients.json',{
      method:'POST',
      body:JSON.stringify(ingredient),
      headers:{'Content-Type':'application/json'}
    })
    .then(response => {
     // console.log('Done');
      return response.json(); 
    })
    .then(responseData => {
     // console.log('Done');
      setUserIngredients(prevIngredients => [
        ...prevIngredients,
        {id: responseData.name, ...ingredient}
      ]); 
    });
  }

  const removeIngredientHandler = ingredientId => {
    const ingridientUpdated = userIngredients.filter(element => element.id !== ingredientId)
    setUserIngredients(ingridientUpdated);
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient = {addIngredientsHandler}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}
export default Ingredients;
