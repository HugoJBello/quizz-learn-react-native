import {combineReducers} from 'redux';
import {userReducer} from './user.reducers';
import {quizzReducer} from "./quiz.reducers";
import {configReducer} from "./config.reducers";

export const rootReducer = combineReducers({
  user: userReducer,
  quiz: quizzReducer,
  config: configReducer
});

export type RootState = ReturnType<typeof rootReducer>;
