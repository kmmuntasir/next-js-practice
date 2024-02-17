interface Answer {
    id: string;
    answer: string;
    isCorrect: boolean;
}

type Question = {
    id: string;
    question: string;
    answers: Answer[];
}

type Quiz = {
    id: string;
    name: string;
    questions: Question[];
}

export type {
    Answer,
    Question,
    Quiz
}