import {Quiz} from "./quiz";

export interface Progress {
    lections: { [lectionId: string]: LectionProgress },
    points: number,
    level: number,
    badges: string[],
    lastActive: Date
}

export interface LectionProgress {
    globalStatus: LectionProgress
    lastPart: number
    finishedInitialQuizz: boolean
    finishedFinalQuizz: boolean
}

export enum LectionStatus {
    STARTED = "STARTED",
    FINISHED = "FINISHED"
}

export const UPDATE_PROGRESS = 'UPDATE_PROGRESS';

export interface UpdateProgressAction {
    type: typeof UPDATE_PROGRESS;
    payload: Progress;
}
