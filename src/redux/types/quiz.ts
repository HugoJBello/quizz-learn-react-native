
export interface Quiz {
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


export const UPDATE_QUIZ = 'UPDATE_QUIZ';

export interface UpdateQuizAction {
    type: typeof UPDATE_QUIZ;
    payload: Quiz;
}
