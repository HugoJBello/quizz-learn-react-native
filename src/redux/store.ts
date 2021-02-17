import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from './reducers';
//import {createLogger} from 'redux-logger';
import {asyncFunctionMiddleware} from "./middlewares/progressMiddleware";

//const loggerMiddleware = createLogger();

const middleware = applyMiddleware(thunk,
    asyncFunctionMiddleware
    //loggerMiddleware
);
export const store = createStore(rootReducer, middleware);
