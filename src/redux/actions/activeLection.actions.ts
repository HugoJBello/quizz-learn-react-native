import {ActionCreator} from 'redux';
import {Lection, UPDATE_ACTIVE_LECTION, UpdateActiveLectionAction} from "../types/lection";

export const updateStoredActiveLection: ActionCreator<UpdateActiveLectionAction> = (lection: Lection) => {
  return {type: UPDATE_ACTIVE_LECTION, payload: lection};
};
