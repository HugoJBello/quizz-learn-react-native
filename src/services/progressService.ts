import {Progress} from "../redux/types/progress";
import {AsyncStorage} from "@react-native-community/async-storage";


export const getProgressStateDb = async ():Promise<Progress> => {
    try {
        const progressStr = await AsyncStorage.getItem('progress');
        const progress =  JSON.parse(progressStr as string) as Progress
        if (!progress || !progress.lastActive) {
            return initializeProgress()
        }
    } catch (e) {
        //console.log(e)
        return initializeProgress()
    }
}

export const initializeProgress = ():Progress => {
    return {
        lastActive:new Date(),
        level:0,
        points:0,
        lections: {},
        badges:[]
    } as Progress
}


export const setProgressStateDb = async (progress: Progress) => {
    try {
        const progress = await AsyncStorage.setItem('progress', JSON.stringify(process));
    } catch (e) {
        console.log(e)
    }
}
