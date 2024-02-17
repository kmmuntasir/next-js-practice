import styles from './quizPage.module.css';
import {Answer, Quiz} from "@/models/models";
import {BASE_URL} from "@/constants/apiConstant";
import Link from "next/link";
import {Suspense} from "react";

function AnswerComponent({answer, showCorrect}: { answer: Answer, showCorrect: boolean }) {
    return (
        <li>
            <input type="radio" id={answer.id} name="answer" value={answer.id}/>
            <label htmlFor={answer.id}>{answer.answer} {(showCorrect && answer.isCorrect) ? '-> Correct' : ''}</label>
        </li>
    );
}

export default async function QuizPage({
                                           params, searchParams
                                       }: {
    params: { id: string };
    searchParams: { show?: string };
}) {

    const quiz = await fetch(BASE_URL + "/quizzes/" + params.id)
        .then((res) => res.json()) as Quiz;

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <section>
                <h1 className={styles.quizHeader}>Quiz {params.id}</h1>
                <ul>
                    {quiz.questions.map((question, index) => (
                        <li key={question.id}>
                            <h3>Question {index + 1}: {question.question}</h3>
                            <ul>
                                {question.answers.map((answer) => (
                                    <AnswerComponent key={answer.id} answer={answer}
                                                     showCorrect={'true' === searchParams.show}/>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
                <button type={"button"}>Submit</button>
                <br/>
                {
                    'true' === searchParams.show
                        ? <><Link href={"?show=false"}>Hide answers</Link><br/></>
                        : <><Link href={"?show=true"}>Show answers</Link><br/></>
                }
                <Link href={"/"}>Back to all quizzes</Link>
            </section>
        </Suspense>
    );
}