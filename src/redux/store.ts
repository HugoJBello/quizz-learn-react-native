//https://medium.com/@leandroercoli/react-native-integration-with-redux-and-typescript-part-1-6ee1b3da19a0
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from './reducers';
import {createLogger} from 'redux-logger';

const loggerMiddleware = createLogger();

const middleware = applyMiddleware(thunk, loggerMiddleware);
export const store = createStore(rootReducer, middleware);
