import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from "react-i18next";
import {fetchLessonsData, fetchProcessData} from "../redux/middlewares/progressMiddleware";

const Startup = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProcessData)
        dispatch(fetchLessonsData)
    }, []);

    return (
        <>
        </>
    );
};


export default Startup;
