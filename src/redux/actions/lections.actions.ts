import {ActionCreator} from 'redux';
import {
  Lesson,
  UPDATE_ACTIVE_LESSON,
  UPDATE_LESSONS,
  UpdateActiveLessonAction,
  UpdateLectionsAction
} from "../types/lesson";
import {getLessonStateDb} from "../../services/lessonsService";

export const updateStoredLections: ActionCreator<UpdateLectionsAction> = (lections: Lesson[]) => {
  return {type: UPDATE_LESSONS, payload: {activeLessons: lections}};
};



export const fetchLessonsData = (dispatch:any, getState:any) => {
  getLessonStateDb().then(lessons => {
    dispatch({type: UPDATE_LESSONS, payload: {activeLessons:lessons}})
    const les = getState().lessons
    console.log('lessons --->', les)
  })
}
