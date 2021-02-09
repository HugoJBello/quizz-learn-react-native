import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Badge} from 'react-native-paper';
import {useTranslation} from "react-i18next";
import {Card, CheckBox, Icon, ListItem, Text} from 'react-native-elements'
import {Lesson} from "../redux/types/lesson";
import {Progress} from "../redux/types/progress";
import {updateProgressStartQuiz} from "../services/progressService";
import {updateStoredProgress} from "../redux/actions/progress.actions";
import {ProgressBar, Colors} from 'react-native-paper';
import {Question, Quiz} from "../redux/types/quiz";
import {updateStoredActiveQuiz} from "../redux/actions/activeQuiz.actions";
import {ChosenAnswerMultichoice, QuizUserSolution} from "../redux/types/quizUserSolution";
import {getUserSolutionDb, saveUserSolutionDb} from "../services/userSolutionService";

const QuizEntry = ({route, navigation}: any) => {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    let {lesson, quiz} = route.params
    const [quizUserSolution, setQuizUserSolution] = useState({} as QuizUserSolution)

    lesson = lesson as Lesson
    quiz = quiz as Quiz

    const progress = useSelector((state: any) => state.progress as Progress);
    const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void

    useEffect(() => {
        console.log(quiz.questions)
        dispatch(updateStoredActiveQuiz(quiz))

        updateProgress(progress, lesson)
    }, [lesson]);

    useEffect(() => {
        getPreviousSolution(quiz).then((sol: QuizUserSolution | null) => {
            if (!sol) {
                const quizUserSolution = {quizId: quiz.id, lessonId: lesson.id} as QuizUserSolution
                const answers = [] as ChosenAnswerMultichoice[]
                quizUserSolution.userAnswers = answers
                quizUserSolution.startedAt = new Date()
                setQuizUserSolution(quizUserSolution)
                saveUserSolutionDb(quizUserSolution)
            } else {
                setQuizUserSolution(sol)
            }
            console.log(sol)
        })
    }, [quiz, lesson]);

    const getPreviousSolution = async (quiz: Quiz): Promise<QuizUserSolution | null> => {
        return getUserSolutionDb(quiz.id)
    }

    const updateProgress = async (progress: Progress, lesson: Lesson) => {
        await updateProgressStartQuiz(progress, lesson, quiz)
        dispatch(updateStoredProgress(progress))
    }

    const isChecked = (quizUserSolution:QuizUserSolution, questionIndex: number, answerIndex: number): boolean => {
        if (quizUserSolution && quizUserSolution.userAnswers) {
            const answer = quizUserSolution.userAnswers.find((answ) => answ.questionIndex == questionIndex) as ChosenAnswerMultichoice
            if (!answer) return false
            return answer.selectedOptions.includes(answerIndex)
        }
        return false
    }

    const check = (questionIndex: number, answerIndex: number) => {
        console.log(quizUserSolution)
        if (quizUserSolution && quizUserSolution.userAnswers) {
            let answer = quizUserSolution.userAnswers.find((answ) => answ.questionIndex == questionIndex) as ChosenAnswerMultichoice

            if (!answer) {
                answer = {questionIndex} as ChosenAnswerMultichoice
                answer.selectedOptions = [answerIndex]
                quizUserSolution.userAnswers.push(answer)
            }

            checkResponseInAnswer(answer, answerIndex)
            saveUserSolutionDb(quizUserSolution)
            forceUpdate()

        }
    }

    const checkResponseInAnswer = (answer: ChosenAnswerMultichoice, answerIndex: number) => {
        if (answer.selectedOptions.includes(answerIndex)) {
            console.log(answer)
            answer.selectedOptions.splice(answer.selectedOptions.indexOf(answerIndex), 1)
            console.log(answer, answerIndex)
        } else {
            answer.selectedOptions.push(answerIndex)
            answer.selectedOptions.filter((element: number, i: number) => i === answer.selectedOptions.indexOf(element))
        }
    }

    const quizDetailsCard = () => {
        return <Card containerStyle={styles.details}>
            <Card.Title>{quiz.title}</Card.Title>

            <ListItem>
                <Icon name="info" type="ant-design"/>
                <ListItem.Content>
                    <ListItem.Title>{quiz.description}</ListItem.Title>
                </ListItem.Content>
            </ListItem>

            <ListItem>
                <Badge>{quiz.difficultyPercent}</Badge>
                <ListItem.Content>
                    <ListItem.Subtitle>{t('difficulty')} </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>

            <ListItem>
                <Badge>{quiz.questions.length}</Badge>
                <ListItem.Content>
                    <ListItem.Subtitle> {t('questions')} </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>

        </Card>
    }

    const questionCard = (question: Question, questionIndex: number) => {
        return <Card containerStyle={styles.question}>
            <Card.Title>{questionIndex + 1}</Card.Title>
            <ListItem>
                <Icon name="flash" type="entypo"/>
                <ListItem.Content>
                    <ListItem.Title>{question.questionText}</ListItem.Title>
                </ListItem.Content>
            </ListItem>

            {question.answerOptions && question.answerOptions.map((answer: string, answerIndex: number) =>
                <ListItem key={answerIndex}>
                    <CheckBox
                        onPress={() => check(questionIndex, answerIndex)}
                        checked={isChecked(quizUserSolution,questionIndex, answerIndex)}
                    />
                    <ListItem.Content>
                        <ListItem.Title>{answer}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            )
            }
        </Card>
    }

    const progressCard = () => {
        // @ts-ignore
        return <Card>
            <ProgressBar progress={getProgressInQuizz()} color={Colors.red800}/>
        </Card>
    }

    const getProgressInQuizz = () => {
        if (progress && lesson && progress.lessons && progress.lessons[lesson.id]) {
            return progress.lessons[lesson.id].percentDone / 100
        }
    }

    return (
        <>
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    {quiz && <View>
                        {quizDetailsCard()}
                        {quiz.questions && quiz.questions.map((question: Question, index: number) => questionCard(question, index))}
                    </View>
                    }
                </ScrollView>
            </SafeAreaView>
        </>
    );


};
const styles = StyleSheet.create({
    scrollView: {},
    details: {
        borderRadius: 10,
        borderWidth: 2
    },
    question: {
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 10
    },
    body: {
        padding: 10
    },
});

export default QuizEntry;
