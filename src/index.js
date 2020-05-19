import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter}  from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware,compose,combineReducers} from 'redux';
import burgerBuilderReducer from './Store/reducer/burgerBuilderReducer';
import orderReducer from './Store/reducer/orderReducer';
import authReducer from './Store/reducer/authReducer'
import thunk from 'redux-thunk';

/*process.env.NODE_ENV will make appliaction to show development tools conditionally
means in development mode user can inspect javascript code but in production mode
it's not possible*/

//const composeEnhancers =process.env.NODE_ENV === 'development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null|| compose; //issue

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
});

const store = createStore(rootReducer,compose(applyMiddleware(thunk)));

const app = (
    <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
          <App />
          </BrowserRouter>
        </Provider>
    </React.StrictMode>

);

ReactDOM.render(app,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
