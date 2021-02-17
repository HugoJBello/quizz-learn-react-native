import AsyncStorage from "@react-native-community/async-storage";
import {ChosenAnswerMultichoice, QuizUserSolution} from "../redux/types/quizUserSolution";
import {LessonResults, QuizResults} from "../redux/types/quizResults";
import {Quiz} from "../redux/types/quiz";
import {isEqual} from 'lodash'
import {Lesson} from "../redux/types/lesson";

const QUIZRESULTS_COLLECTION = "quiz_results"
const LESSONRESULTS_COLLECTION = "lesson_results"

export const getQuizResultDb = async (quizzId: string): Promise<QuizResults | null> => {
    try {
        const solutionStr = await AsyncStorage.getItem(generateIdQuizResult(quizzId))
        if (solutionStr) {
            const quizSol = JSON.parse(solutionStr as string) as QuizResults
            return quizSol
        }
        return null
    } catch (e) {
        return null
    }
}

const generateIdQuizResult = (quizzId: string): string => {
    return QUIZRESULTS_COLLECTION + "_" + quizzId
}

export const saveQuizResultDb = async (results: QuizResults) => {
    try {
        const id = generateIdQuizResult(results.quizId)
        results.id = id
        await AsyncStorage.setItem(id, JSON.stringify(results));
    } catch (e) {
        console.log(e)
        throw e
    }
}

export const getLessonResultDb = async (lessonId: string): Promise<LessonResults | null> => {
    try {
        const solutionStr = await AsyncStorage.getItem(generateIdLessonResult(lessonId))
        if (solutionStr) {
            const lessonSol = JSON.parse(solutionStr as string) as LessonResults
            return lessonSol
        }
        return null
    } catch (e) {
        return null
    }
}

const generateIdLessonResult = (lessonId: string): string => {
    return LESSONRESULTS_COLLECTION + "_" + lessonId
}

export const saveLessonResultDb = async (results: LessonResults) => {
    try {
        const id = generateIdLessonResult(results.lessonId)
        results.id = id
        await AsyncStorage.setItem(id, JSON.stringify(results));
    } catch (e) {
        console.log(e)
        throw e
    }
}



export const evaluateQuiz = (quiz:Quiz, solution: QuizUserSolution): QuizResults => {
    if (!quiz || !solution || !solution.userAnswers) {
        return {} as QuizResults
    }

    const quizResult = {} as QuizResults
    quizResult.lessonId = quiz.lessonId
    quizResult.quizId = quiz.id
    quizResult.id = generateIdQuizResult(quiz.id)
    quizResult.correctAnswers = []
    quizResult.wrongAnswers = []

    for (const answ of solution.userAnswers) {
        const index = answ.questionIndex
        const responses = (answ as ChosenAnswerMultichoice).selectedOptions
        const correctResponsesForAnsw = quiz.questions[index].correctAnswers
        const isCorrectAns = isEqual(responses, correctResponsesForAnsw)

        if (responses.length>0 && isCorrectAns) {
            quizResult.correctAnswers.push(index)
        } else if(responses.length>0) {
            quizResult.wrongAnswers.push(index)
        }
    }

    const numTotalQuest = quiz.questions.length
    const numCorrectQuest = quizResult.correctAnswers.length
    const numWrongQuest = quizResult.wrongAnswers.length

    const score = (numCorrectQuest)/numTotalQuest - (numWrongQuest * 0.25)/numTotalQuest
    quizResult.score = score * 100
    return  quizResult
}



export const evaluateLesson = (lesson:Lesson, solutionInitialTest: QuizResults, solutionFinalTest:QuizResults): LessonResults => {
    if (!lesson || !solutionInitialTest || !solutionFinalTest.score) {
        return {} as LessonResults
    }
    const lessonResult = {} as LessonResults
    lessonResult.lessonId = lesson.id
    lessonResult.id = generateIdLessonResult(lesson.id)
    lessonResult.initialQuizResult = solutionInitialTest
    lessonResult.finalQuizResult = solutionFinalTest
    lessonResult.totalScore = solutionFinalTest.score
    return lessonResult
}
