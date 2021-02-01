import {ActionCreator} from 'redux';
import {Quiz, UPDATE_QUIZ, UpdateQuizAction} from "../types/quiz";

export const updateStoredQuiz: ActionCreator<UpdateQuizAction> = (user: Quiz) => {
  return {type: UPDATE_QUIZ, payload: user};
};
