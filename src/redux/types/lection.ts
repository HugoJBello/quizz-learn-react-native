import {Quiz} from "./quiz";

export interface Lection {
    id: string,
    type: string,
    title: string,
    frontImage: string,
    subtitle: string,
    parts: string[],
    difficulty: string,
    initialQuiz: Quiz,
    finalQuiz: Quiz,
    quizzes: Quiz[],
    public: boolean,
    date: Date
}

export const UPDATE_ACTIVE_LECTION = 'UPDATE_ACTIVE_LECTION';

export interface UpdateActiveLectionAction {
    type: typeof UPDATE_ACTIVE_LECTION;
    payload: Lection;
}


export const UPDATE_LECTIONS = 'UPDATE_LECTIONS';

export interface UpdateLectionsAction {
    type: typeof UPDATE_LECTIONS;
    payload: Lection[];
}
