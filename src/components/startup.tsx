import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {User} from '../redux/types/users';
import { useTranslation } from "react-i18next";
import {Progress} from "../redux/types/progress";
import {updateStoredProgress} from "../redux/actions/progress.actions";
import {AsyncStorage} from "@react-native-community/async-storage";

const Startup = () => {
    const { t } = useTranslation();
    const user = useSelector((state: any) => state.user as User);
    const dispatch = useDispatch()
    useEffect(() => {
        getInitialProgressState().then((progress:Progress) => {
            console.log(progress)
            dispatch(updateStoredProgress(progress))
        })
    }, []);



    const getInitialProgressState = async ():Promise<Progress> => {
        try {
            const progress = await AsyncStorage.getItem('progress');
            return JSON.parse(progress as string) as Progress
        } catch (e) {
            console.log(e)
            return {} as Progress
        }

    }

    return (
        <>
        </>
    );
};


export default Startup;
