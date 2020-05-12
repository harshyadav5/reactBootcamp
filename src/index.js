import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers , applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
 
import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultReducer
});

const logger = store => {
    return next => {
        return action => {
            console.log('[Middleware] Dispatching', action)
            const result = next(action);
            console.log('[Middleware] next State', store.getState())
            return result;
        }
    }
}

/* window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ,this is esentially a variable which 
is injected by chrome extension into our javaScript at run time*/

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,composeEnchancer(applyMiddleware(logger,thunk)));

ReactDOM.render(<Provider store={store} ><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
