import {ActionCreator} from 'redux';
import {
  Lesson,
  UPDATE_ACTIVE_LESSON,
  UPDATE_LESSONS,
  UpdateActiveLessonAction,
  UpdateLectionsAction
} from "../types/lesson";
import {Progress, UPDATE_PROGRESS, UpdateProgressAction} from "../types/progress";

export const updateStoredProgress: ActionCreator<UpdateProgressAction> = (progress: Progress) => {
  return {type: UPDATE_PROGRESS, payload: progress};
};
