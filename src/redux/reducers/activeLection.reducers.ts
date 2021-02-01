import {Lection, UPDATE_ACTIVE_LECTION, UpdateActiveLectionAction} from "../types/lection";

const initial = require("../mock/initialLections.json") as Lection[]
const initialLectionState: Lection = initial[0]

export function activeLectionReducer(
  state: Lection = initialLectionState,
  action: UpdateActiveLectionAction,
): Lection {
  switch (action.type) {
    case UPDATE_ACTIVE_LECTION: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
}
