import {ActionCreator} from 'redux';
import {
  Lection,
  UPDATE_ACTIVE_LECTION,
  UPDATE_LECTIONS,
  UpdateActiveLectionAction,
  UpdateLectionsAction
} from "../types/lection";

export const updateStoredLections: ActionCreator<UpdateLectionsAction> = (lections: Lection[]) => {
  return {type: UPDATE_LECTIONS, payload: lections};
};
