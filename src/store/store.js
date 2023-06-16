import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

export const initializeStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
};