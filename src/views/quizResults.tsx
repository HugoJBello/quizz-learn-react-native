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
import {Button} from "react-native-elements";
import {Question, Quiz} from "../redux/types/quiz";
import {updateStoredActiveQuiz} from "../redux/actions/activeQuiz.actions";
import {ChosenAnswerMultichoice, QuizUserSolution} from "../redux/types/quizUserSolution";
import {getUserSolutionDb, saveUserSolutionDb, sendUserSolutionDb} from "../services/userSolutionService";

const QuizResults = ({route, navigation}: any) => {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    let {lesson, quiz, quizUserSolution} = route.params

    lesson = lesson as Lesson
    quizUserSolution = quizUserSolution as QuizUserSolution
    quiz = quiz as Quiz

    const progress = useSelector((state: any) => state.progress as Progress);
    const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void


    useEffect(() => {
        evaluateResults(quiz, quizUserSolution)
    }, [quiz, lesson, quizUserSolution]);


    const evaluateResults = (quiz: Quiz, quizUserSolution: QuizUserSolution) => {

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


    return (
        <>
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    {quiz && <View>
                        {quizDetailsCard()}
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
    buttonSend: {backgroundColor: 'blue'},
    sendCard: {
        marginBottom: 30,
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

export default QuizResults;
