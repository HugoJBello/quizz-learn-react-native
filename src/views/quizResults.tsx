import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Badge} from 'react-native-paper';
import {useTranslation} from "react-i18next";
import {Card, CheckBox, Divider, Icon, ListItem, Text} from 'react-native-elements'
import {Lesson} from "../redux/types/lesson";
import {Progress} from "../redux/types/progress";
import {updateProgressStartQuiz} from "../services/progressService";
import {updateStoredProgress} from "../redux/actions/progress.actions";
import {ProgressBar, Colors} from 'react-native-paper';
import {Button} from "react-native-elements";
import {Question, Quiz} from "../redux/types/quiz";
import {updateStoredActiveQuiz} from "../redux/actions/activeQuiz.actions";
import {ChosenAnswerMultichoice, QuizUserSolution} from "../redux/types/quizUserSolution";
import {getUserSolutionDb, saveUserSolutionDb, sendUserSolutionDb} from "../services/userSolutionService";
import {evaluateQuiz} from "../services/evaluationService";
import {QuizResults} from "../redux/types/quizResults";

const QuizSolutionResults = ({route, navigation}: any) => {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    let {lesson, quiz, quizUserSolution} = route.params

    lesson = lesson as Lesson
    quizUserSolution = quizUserSolution as QuizUserSolution
    quiz = quiz as Quiz
    const [quizResult, setQuizResults] = useState(null as QuizResults | null)

    const progress = useSelector((state: any) => state.progress as Progress);
    const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void


    useEffect(() => {
        evaluateResults(quiz, quizUserSolution)
    }, [quiz, lesson, quizUserSolution]);


    const evaluateResults = (quiz: Quiz, quizUserSolution: QuizUserSolution) => {
        const results = evaluateQuiz(quiz, quizUserSolution)
        setQuizResults(results)
    }

    const quizResultsCard = () => {
        return <Card containerStyle={styles.resultsCard}>
            <Card.Title>{t('Results')}</Card.Title>
            {quizResult && <View>
                {(quizResult.score < 50) && <ListItem>
                    <Icon name="meh" type="ant-design"/>
                    <ListItem.Content>
                        <ListItem.Title>{t('Score ')} {Math.round(quizResult.score)}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                }
                {(quizResult.score >= 50) && <ListItem>
                    <Icon name="smileo" type="ant-design"/>
                    <ListItem.Content>
                        <ListItem.Title>{t('Score ')} {Math.round(quizResult.score)}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                }

                <ListItem>
                    <Icon name="check" type="entypo"/>
                    <ListItem.Content>
                        <ListItem.Title>{t('Correct answers ')} {quizResult.correctAnswers.length}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>

                <ListItem>
                    <Icon name="cross" type="entypo"/>
                    <ListItem.Content>
                        <ListItem.Title>{t('Wrong answers ')} {quizResult.wrongAnswers.length}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </View>}

        </Card>
    }

    const correctionCard = () => {
        return <Card>
            <Card.Title>{t('Correction')}</Card.Title>
            {quiz && quiz.questions && quiz.questions.map((question: Question, index: number) => <View key={index}>
                    <ListItem>
                        <Icon name="flash" type="entypo"/>
                        <ListItem.Content>
                            <ListItem.Title>{question.questionText}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                    <ListItem>
                        <Icon name="check" type="entypo"/>
                        <ListItem.Content>
                            <ListItem.Title>{t('Correct')}: {getCorrectAnswer(question)}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                    {quizUserSolution && quizUserSolution.userAnswers && <ListItem>
                        <ListItem.Content>
                            <ListItem.Title>{t('Your answer')}: {getUserAnswerForQuestion(index)}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                    }
                <Divider/>

                </View>
            )}
        </Card>
    }
    const getCorrectAnswer = (question:Question): string => {
        const questionOpts =question.answerOptions
        const correctAns =  question.correctAnswers.map((correct:number)=>question.answerOptions[correct])
        return correctAns.join(", ")
    }


        const getUserAnswerForQuestion = (index:number): string => {
        const answ = quizUserSolution.userAnswers.find( (ans : ChosenAnswerMultichoice) => {
            return ans.questionIndex == index
        })
        console.log(answ)
        if (!answ || !answ.selectedOptions || answ.selectedOptions.length === 0) return ""

        const options =  answ.selectedOptions
        const answers = options.map( (opt: number) => quiz.questions[index].answerOptions[opt])
        if (!answers) return ""

        return answers.join(", ")
    }

    return (
        <>
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    {quiz && <View>
                        {quizResultsCard()}
                        {correctionCard()}
                    </View>
                    }
                </ScrollView>
            </SafeAreaView>
        </>
    );


};
const styles = StyleSheet.create({
    scrollView: {},
    resultsCard: {
        borderRadius: 10,
        borderWidth: 2
    },
    body: {
        padding: 10
    },
});

export default QuizSolutionResults;
