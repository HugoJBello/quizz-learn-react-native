import React, {useContext, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useSelector} from 'react-redux';
import {User} from '../redux/types/users';
import {Button, Header, ThemeContext, Tile} from "react-native-elements";
import { useTranslation } from "react-i18next";
import {Lesson} from "../redux/types/lesson";
import { ListItem, Avatar } from 'react-native-elements'

declare const global: {HermesInternal: null | {}};

const LessonMenu = ({navigation}:any) => {
  const { t } = useTranslation();

  const user = useSelector((state: any) => state.user as User);
  const lections = useSelector((state: any) => state.lessons.activeLessons as Lesson[]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
  }, []);

  return (
    <>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Tile
              imageSrc={require('../static/images/class2.jpg')}
              title="Available Lections"
              featured
              caption="choose one"
          />

          <View>
            {
              lections.map((l, i) => (
                  <ListItem key={i}
                            onPress={() => navigation.navigate('LessonEntry',{lesson:l})}
                            bottomDivider>
                    <Avatar source= {require('../static/images/classroom.jpg')} />
                    <ListItem.Content>
                      <ListItem.Title>{l.title}</ListItem.Title>
                      <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
              ))
            }
          </View>

        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
    padding:10
  },
});

export default LessonMenu;
