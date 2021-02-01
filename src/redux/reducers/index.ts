import {combineReducers} from 'redux';
import {userReducer} from './user.reducers';
import {activeQuizzReducer} from "./activeQuiz.reducers";
import {configReducer} from "./config.reducers";
import {activeLectionReducer} from "./activeLection.reducers";
import {lectionsReducer} from "./lections.reducers";

export const rootReducer = combineReducers({
  user: userReducer,
  activeQuiz: activeQuizzReducer,
  config: configReducer,
  activeLection: activeLectionReducer,
  lections: lectionsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
