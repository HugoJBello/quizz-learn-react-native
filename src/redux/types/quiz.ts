

export interface Quiz {
    id: string
    type: string,
    title: string,
    subtitle: string,
    description: string,
    difficulty: string,
    questions: Question[],
    public: boolean,
    date: Date
}

export interface Question {
    type: string,
    questionText: string,
    answerOptions: string[],
    correctAnswers: number[],
    tips: string[],
    explanation: string
}


export const UPDATE_ACTIVE_QUIZ = 'UPDATE_ACTIVE_QUIZ';

export interface UpdateActiveQuizAction {
    type: typeof UPDATE_ACTIVE_QUIZ;
    payload: Quiz;
}
