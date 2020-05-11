import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {createStore,combineReducers} from 'redux';
import addReducer from './store/AddReducer';
import deleteReducer from './store/DeleteReducer';

// const rootReducer = combineReducers({
//     add: addReducer,
//     del: deleteReducer
// });
const store = createStore(addReducer)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
