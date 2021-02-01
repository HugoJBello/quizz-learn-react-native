import {Quiz, UPDATE_QUIZ, UpdateQuizAction} from "../types/quiz";

const initial = require("../mock/initialQuizzes.json") as Quiz[]
const initialQuizState: Quiz = initial[0] as Quiz;

export function quizzReducer(
  state: Quiz = initialQuizState,
  action: UpdateQuizAction,
): Quiz {
  switch (action.type) {
    case UPDATE_QUIZ: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
}
