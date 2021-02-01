import React, {useContext, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {User} from '../redux/types/users';
import { useTranslation } from "react-i18next";
import {Lection} from "../redux/types/lection";


const Lecture = ({ route, navigation }:any) => {
  const { t } = useTranslation();
  const {lection} = route.params

  const user = useSelector((state: any) => state.user as User);

  useEffect(() => {
    console.log(lection)
  }, [lection]);

  return (
    <>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
 },
  body: {
    padding:10
  },
});

export default Lecture;
