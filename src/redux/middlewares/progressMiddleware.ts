import {getProgressStateDb} from "../../services/progressService";
import {UPDATE_PROGRESS} from "../types/progress";
import {getLessonStateDb} from "../../services/lessonsService";
import {UPDATE_LESSONS} from "../types/lesson";

export const asyncFunctionMiddleware = (storeAPI:any) => (next:Function) => (action:any) => {
    if (typeof action === 'function') {
        return action(storeAPI.dispatch, storeAPI.getState)
    }
    return next(action)
}


export const fetchProcessData = (dispatch:any, getState:any) => {
    getProgressStateDb().then(progress => {
        dispatch({type: UPDATE_PROGRESS, payload: progress})
        const prog = getState().progress
        console.log('progress --->', prog)
    })
}

export const fetchLessonsData = (dispatch:any, getState:any) => {
    getLessonStateDb().then(lessons => {
        dispatch({type: UPDATE_LESSONS, payload: {activeLessons:lessons}})
        const les = getState().lessons
        console.log('lessons --->', les)
    })
}
