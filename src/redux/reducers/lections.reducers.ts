import {
  Lection,
  UPDATE_LECTIONS,
  UpdateLectionsAction
} from "../types/lection";

const initial = require("../mock/initialLections.json") as Lection[]
const initialLectionState: Lection[] = initial

export function lectionsReducer(
  state: Lection[] = initialLectionState,
  action: UpdateLectionsAction,
): Lection[] {
  switch (action.type) {
    case UPDATE_LECTIONS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
}
