import {LectionStatus, LessonsProgress, Progress, QuizStatus} from "../redux/types/progress";
import AsyncStorage from "@react-native-community/async-storage";
import {Lesson} from "../redux/types/lesson";
import {Quiz, QuizType} from "../redux/types/quiz";


export const getProgressStateDb = async ():Promise<Progress> => {
    try {
        const progressStr = await AsyncStorage.getItem('progress');
        const progress =  JSON.parse(progressStr as string) as Progress
        if (!progress || !progress.lastActive) {
            return initializeProgress()
        }
        return progress
    } catch (e) {
        //console.log(e)
        return initializeProgress()
    }
}

export const initializeProgress = ():Progress => {
    return {
        lastActive:new Date(),
        level:0,
        points:0,
        lessons: {},
        badges:[]
    } as Progress
}


export const updateProgressStateDb = async (progress: Progress) => {
    try {
        await AsyncStorage.setItem('progress', JSON.stringify(progress));
    } catch (e) {
        console.log(e)
        throw e
    }
}

export const updateProgressStartLesson = async (progress: Progress, lesson:Lesson) => {
    progress.lastActive = new Date()
    if (!progress.lessons[lesson.id]){
        progress.lessons[lesson.id] = {globalStatus: LectionStatus.STARTED,
            percentDone:3} as LessonsProgress
    }
    await updateProgressStateDb(progress)
}

export const updateProgressStartQuiz = async (progress: Progress, lesson:Lesson, quiz:Quiz) => {
    progress.lastActive = new Date()
    if (!progress.lessons[lesson.id]){
        progress.lessons[lesson.id] = {globalStatus: LectionStatus.STARTED} as LessonsProgress
    }
    progress.lessons[lesson.id].percentDone = 7

    if (quiz.quizType == QuizType.INITIAL) {
        progress.lessons[lesson.id].initialQuizProgress = QuizStatus.STARTED
    } else if (quiz.quizType == QuizType.FINAL) {
        progress.lessons[lesson.id].finalQuizProgress = QuizStatus.STARTED
    }

    await updateProgressStateDb(progress)
}
