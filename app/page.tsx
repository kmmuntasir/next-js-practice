import Link from "next/link";
import {Suspense} from "react";
import {Quiz} from "@/models/models";
import {BASE_URL} from "@/constants/apiConstant";

async function Quizzes() {
    const quizzes = await fetch(BASE_URL + "/quizzes")
        .then((res) => res.json()) as Quiz[];

    return (
        <ul>
            {quizzes.map((quiz) => (
                <li key={quiz.id}>
                    <Link href={`/quiz/${quiz.id}`}>{quiz.name}</Link>
                </li>
            ))}
        </ul>
    );
}

export default function Home() {
    return (
        <section>
            <h1 className="text-2xl font-semibold text-blue-700">All Quizzes</h1>
            <Suspense fallback={<p>Loading...</p>}>
                <Quizzes/>
            </Suspense>
        </section>
    );
}
