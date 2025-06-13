// serverSentences.jsx
import { useState, useRef, useEffect, useContext } from "react";
import Counter from "../components/Counter";
import Head from "next/head";
import LessonTranslation from "../components/lesson/LessonTranslation";
import { ContentContext } from "../context";
import LevelModeBlock from "../components/ui/menuBlocks/LevelModeBlock";
import LessonModeBlock from "../components/ui/menuBlocks/LessonModeBlock";
import { getFilteredLessons } from "../utils";

export default function ServerSentences() {
    const [initialData, setInitialData] = useState();
    const [isDataAvailable, setIsDataAvailable] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [translationsCounter, setTranslationsCounter] = useState(0);
    const [loading, setLoading] = useState(false);
    const [resetTrigger, setResetTrigger] = useState(false);
    const count = useRef();
    const {
        currentTask,
        currentLevel,
        currentLesson,
        setCurrentLesson,
        setCurrentLessonList,
    } = useContext(ContentContext);

	useEffect(() => {
		const lessonsList = currentTask?.value || [];
		const { filteredLessonsList, lessonToSet } =
			getFilteredLessons({
				lessonsList,
				currentLevel,
				currentLesson,
				hasLevels: !! currentTask.levels,
			});

		setCurrentLessonList(filteredLessonsList);
		if (lessonToSet.address !== currentLesson?.address) {
			setCurrentLesson(lessonToSet);
		}
	}, [
		currentTask,
		currentLevel,
		currentLesson,
		setCurrentLesson,
		setCurrentLessonList,
	]);

    return (
        <>
            <Head>
                <title>
                    Тренировка перевода предложений на английский - LearnEnglish
                </title>
                <meta
                    name="description"
                    content="Практикуйте перевод английских предложений с LearnEnglish. Оттачивайте грамматику, синтаксис и словарный запас с помощью интерактивных заданий."
                    key="desc"
                />
                <meta
                    name="keywords"
                    content="перевод предложений, тренировка, английский, грамматика, синтаксис, словарный запас, онлайн упражнения"
                />
            </Head>
            <div className="px-4">
                <div className="w-full max-w-4xl mx-auto align-middle bg-orange-100 border-4 border-s-gray-100 rounded-2xl px-3.5 pb-3.5 pt-1 flex gap-4 bg-opacity-80 mb-6">
                    <div className="w-full flex justify-between items-end">
                        {currentTask.levels && (
                            <LevelModeBlock
                                setIsStarted={setIsStarted}
                                setResetTrigger={setResetTrigger}
                            />
                        )}
                        <Counter
                            value={translationsCounter}
                            className={"w-[44px] h-[44px]"}
                            loading={loading}
                        />
                        <LessonModeBlock
                            setIsStarted={setIsStarted}
                            setResetTrigger={setResetTrigger}
                        />
                    </div>
                </div>
                <div className="w-full max-w-4xl mx-auto align-middle bg-orange-100 border-4 border-s-gray-100 rounded-2xl px-3.5 py-3.5 flex flex-col gap-4 bg-opacity-80">
                    <LessonTranslation
                        initialData={initialData}
                        isDataAvailable={isDataAvailable}
                        setIsDataAvailable={setIsDataAvailable}
                        translationsCounter={translationsCounter}
                        setTranslationsCounter={setTranslationsCounter}
                        isStarted={isStarted}
                        setIsStarted={setIsStarted}
                        count={count}
                        setLoading={setLoading}
                        setInitialData={setInitialData}
                        resetTrigger={resetTrigger}
                    />
                </div>
            </div>
        </>
    );
}
