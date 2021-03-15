import React, {useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  SafeAreaView,
} from 'react-native';

import {Header, Colors} from 'react-native/Libraries/NewAppScreen';
import {useDispatch, useSelector} from 'react-redux';
import {User} from '../redux/types/users';
import {updateStoredUser} from '../redux/actions/user.actions';
import { Button } from 'react-native-elements';
import { Divider } from 'react-native-elements';
import { Tile } from 'react-native-elements';
import {useTranslation} from "react-i18next";

declare const global: {HermesInternal: null | {}};

const Home = ({navigation}: any) => {
  const { t } = useTranslation();

  const user = useSelector((state: any) => state.user as User);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateStoredUser({}));
    console.log(user);
  }, []);

  return (
    <>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <Divider style={{ backgroundColor: 'blue' }} />
            <Tile
                imageSrc={require('../static/images/learning.jpg')}
                title={t("Courses")}
                featured
                caption={t("Continue with your progress or discover new ones")}
                onPress={() => navigation.push('CoursesMenu')}

            />
            <Button
                title="go!"
                raised
                onPress={() => navigation.push('CoursesMenu')}
            />
          </View>
          <Divider style={{ backgroundColor: 'blue' }} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default Home;
