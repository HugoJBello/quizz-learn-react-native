import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {User} from '../redux/types/users';
import {useTranslation} from "react-i18next";
import {Card, Divider, Icon, ListItem, Text} from 'react-native-elements'
import {Lesson} from "../redux/types/lesson";
import {updateStoredActiveLesson} from "../redux/actions/activeLesson.actions";
import {Progress} from "../redux/types/progress";
import {updateProgressStartLesson, updateProgressStartQuiz} from "../services/progressService";
import {updateStoredProgress} from "../redux/actions/progress.actions";
import { ProgressBar, Colors } from 'react-native-paper';
import {Quiz} from "../redux/types/quiz";
import {updateStoredActiveQuiz} from "../redux/actions/activeQuiz.actions";

const QuizEntry = ({route, navigation}: any) => {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    let {lesson, quiz} = route.params

    lesson = lesson as Lesson
    quiz = quiz as Quiz

    const progress = useSelector((state: any) => state.progress as Progress);

    useEffect(() => {
        console.log(progress)
        dispatch(updateStoredActiveQuiz(quiz))

        updateProgress(progress, lesson)
    }, [lesson]);

    const updateProgress = async (progress:Progress, lesson:Lesson) => {
       await updateProgressStartQuiz(progress, lesson, quiz)
        dispatch(updateStoredProgress(progress))
    }

    const quizDetailsCard = () => {
        return <Card>
            <Card.Title>{quiz.title}</Card.Title>
            <Text>{quiz.subtitle}</Text>
            <Text>{quiz.description}</Text>
            <Text>{quiz.difficultyPercent}</Text>
            <Text>{quiz.questions.length} {t('questions')}</Text>
        </Card>
    }

    const questionCard = () => {
        return <Card>
            <Card.Title>{quiz.title}</Card.Title>
        </Card>
    }

    const progressCard = () => {
        // @ts-ignore
        return <Card>
            <ProgressBar progress={getProgressInQuizz()} color={Colors.red800} />
        </Card>
    }

    const getProgressInQuizz = () => {
        if (progress && lesson && progress.lessons && progress.lessons[lesson.id]) {
            return progress.lessons[lesson.id].percentDone/100
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
                        {questionCard()}
                    </View>
                    }
                </ScrollView>
            </SafeAreaView>
        </>
    );


};
const styles = StyleSheet.create({
    scrollView: {},
    body: {
        padding: 10
    },
});

export default QuizEntry;
