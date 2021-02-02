import {Quiz} from "./quiz";

export interface Lesson {
    id: string,
    type: string,
    title: string,
    description: string,
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

export const UPDATE_ACTIVE_LESSON = 'UPDATE_ACTIVE_LECTION';

export interface UpdateActiveLessonAction {
    type: typeof UPDATE_ACTIVE_LESSON;
    payload: Lesson;
}


export const UPDATE_LESSONS = 'UPDATE_LECTIONS';

export interface UpdateLectionsAction {
    type: typeof UPDATE_LESSONS;
    payload: Lesson[];
}
