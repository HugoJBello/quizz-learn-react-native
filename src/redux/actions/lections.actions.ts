import {ActionCreator} from 'redux';
import {
  Lesson,
  UPDATE_ACTIVE_LESSON,
  UPDATE_LESSONS,
  UpdateActiveLessonAction,
  UpdateLectionsAction
} from "../types/lesson";

export const updateStoredLections: ActionCreator<UpdateLectionsAction> = (lections: Lesson[]) => {
  return {type: UPDATE_LESSONS, payload: {activeLessons: lections}};
};
