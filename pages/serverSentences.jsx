/* eslint-disable react-hooks/exhaustive-deps */
import clsx from "clsx";
import { TASKS } from "../staticData";
import { levels } from "../staticData/english_galaxy";
import { useState, useRef, useEffect, useContext } from "react";
import SelectLesson from "../components/ui/SelectLesson";
import Counter from "../components/Counter";
import Head from 'next/head';
import LessonTranslation from '../components/lesson/LessonTranslation';
import { UiButton } from "../components/ui/UiButton";

export default function ServerSentences() {
    const [initialData, setInitialData] = useState();
    const [isDataAvailable, setIsDataAvailable] = useState(false);
    const [translationsCounter, setTranslationsCounter] = useState(0);
    const [currentTask, setCurrentTask] = useState();
    const [currentLessonsList, setCurrentLessonsList] = useState();
	const [currentLevel, setCurrentLevel] = useState(null);
    const [loading, setLoading] = useState(false);
    const count = useRef();

    useEffect(() => {
        setCurrentTask(JSON.parse(localStorage.getItem("currentTask")));
    }, []);

    function selectLevel(value) {
        setIsDataAvailable(false);
        const lessonsList = TASKS[currentTask];
        const sortedLessonsList = lessonsList.filter(
            (item) => item.level == value,
        );
        setCurrentLessonsList(sortedLessonsList);
		setCurrentLevel(value);
    }

    async function selectLesson(value) {
        if (!value) {
            return;
        }

        if (value == "mix") {
            setLoading(true);
            const lessonsAmount = currentLessonsList.length - 1;
            let allTheSentences = [];
            for (let i = 1; i <= lessonsAmount; i++) {
                let currentLesson = currentLessonsList[i];
                const response = await fetch(currentLesson.address);
                const data = await response.json();
                allTheSentences.push(...data);
            }
            setInitialData(allTheSentences);
            count.current = allTheSentences.length;
            setIsDataAvailable(true);
            setLoading(false);
            return;
        }

        setLoading(true);
        const response = await fetch(value);
        const data = await response.json();
        setInitialData(data);
        count.current = data.length;
        setIsDataAvailable(true);
        setLoading(false);
        // textarea_ref.current.focus(); //input autofocus
    }

    return (
		<>
		<Head>
			<title>Тренировка перевода предложений на английский - LearnEnglish</title>
			<meta name="description" content="Практикуйте перевод английских предложений с LearnEnglish. Оттачивайте грамматику, синтаксис и словарный запас с помощью интерактивных заданий." key="desc" />
			<meta name="keywords" content="перевод предложений, тренировка, английский, грамматика, синтаксис, словарный запас, онлайн упражнения" />
        </Head>
        <div className="px-4">
			<div
                className="w-full max-w-4xl mx-auto align-middle bg-orange-100 border-4 border-s-gray-100 rounded-2xl px-3.5 py-3.5 flex gap-4 bg-opacity-80 mb-6"
            >
				<div className="w-full flex justify-between flex-wrap">
                    {currentTask == "english_galaxy" && (
                        <SelectLesson
                            onChange={selectLevel}
                            options={levels}
                            selectName={"Уровень"}
                        ></SelectLesson>
                    )}
                    <Counter
                        value={translationsCounter}
                        className={"w-[38px]"}
                        loading={loading}
                    />
                    <SelectLesson
                        onChange={selectLesson}
                        options={
                            currentTask == "english_galaxy"
                                ? currentLessonsList
                                : TASKS[currentTask]
                        }
                        selectName={"Урок"}
                    />
                </div>
			</div>
            <div
                className="w-full max-w-4xl mx-auto align-middle bg-orange-100 border-4 border-s-gray-100 rounded-2xl px-3.5 py-3.5 flex flex-col gap-4 bg-opacity-80">
                <LessonTranslation
                    initialData={initialData}
                    isDataAvailable={isDataAvailable}
					currentLevel={currentLevel}
					translationsCounter={translationsCounter}
					setTranslationsCounter={setTranslationsCounter}
					count={count}
                />
            </div>
        </div>
		</>
    );
}
