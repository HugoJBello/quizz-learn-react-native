import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {User} from '../redux/types/users';
import {useTranslation} from "react-i18next";
import {Card, Divider, Icon, ListItem, Text} from 'react-native-elements'
import {Lesson} from "../redux/types/lesson";
import {updateStoredActiveLesson} from "../redux/actions/activeLesson.actions";
import {Progress} from "../redux/types/progress";
import {updateProgressStartLesson} from "../services/progressService";
import {updateStoredProgress} from "../redux/actions/progress.actions";
import { ProgressBar, Colors } from 'react-native-paper';

const LessonEntry = ({route, navigation}: any) => {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    let {lesson} = route.params
    lesson = lesson as Lesson

    const user = useSelector((state: any) => state.user as User);
    const progress = useSelector((state: any) => state.progress as Progress);

    useEffect(() => {
        console.log(progress)
        dispatch(updateStoredActiveLesson(lesson))

        updateProgress(progress, lesson)
    }, [lesson]);

    const updateProgress = async (progress:Progress, lesson:Lesson) => {
       await updateProgressStartLesson(progress, lesson)
        dispatch(updateStoredProgress(progress))
    }

    const lessonCard = () => {
        return <Card>
            <Card.Title>{lesson.title}</Card.Title>

            <ListItem onPress={() => navigation.navigate('QuizEntry', {lesson:lesson, quiz:lesson.initialQuiz})} bottomDivider>
                <Icon name="form" type="ant-design"/>
                <ListItem.Content>
                    <ListItem.Title>{t('Initial test')}</ListItem.Title>
                    <ListItem.Subtitle>{t('See where you are')}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>

            <Divider/>

            <ListItem onPress={() => navigation.navigate('LessonPart', {lesson: lesson, partIndex:0})}
                      bottomDivider>
                <Icon name="rocket1" type="ant-design"/>
                <ListItem.Content>
                    <ListItem.Title>{t('Lesson')}</ListItem.Title>
                    <ListItem.Subtitle>{t('Lets improve what we know')}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>

            <Divider/>

            <ListItem onPress={() => navigation.navigate('QuizEntry', {lesson:lesson, quiz:lesson.finalQuiz})} bottomDivider>
                <Icon name="form" type="ant-design"/>
                <ListItem.Content>
                    <ListItem.Title>{t('Final test')}</ListItem.Title>
                    <ListItem.Subtitle>{t('Lets improve how much we learned')}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>

            <Divider/>

            <ListItem disabled={true} onPress={() => navigation.navigate('LessonEntry', {})}
                      bottomDivider>
                <Icon name="dashboard" type="ant-design"/>
                <ListItem.Content>
                    <ListItem.Title>{t('See how you did')}</ListItem.Title>
                    <ListItem.Subtitle>{t('Check your results')}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>

        </Card>
    }

    const detailsCard = () => {
        return <Card>
            <Card.Title>{t('Details')}</Card.Title>
            <Text>{lesson.description}</Text>
        </Card>
    }

    const progressCard = () => {
        // @ts-ignore
        return <Card>
            <ProgressBar progress={getProgressInLection()} color={Colors.red800} />
        </Card>
    }

    const getProgressInLection = () => {
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
                    {lesson && <View>
                        {lessonCard()}

                        {progressCard()}

                        {detailsCard()}
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

export default LessonEntry;
