// serverSentences.jsx
import { useState, useRef, useEffect, useContext } from "react";
import Counter from "../components/Counter";
import Head from "next/head";
import LessonTranslation from "../components/lesson/LessonTranslation";
import { ContentContext } from "../context";
import LevelModeBlock from "../components/ui/menuBlocks/LevelModeBlock";
import LessonModeBlock from "../components/ui/menuBlocks/LessonModeBlock";
import { getFilteredLessons } from "../utils";
import clsx from "clsx";
import Image from "next/image";
import bgTranslation from "../img/bgTranslation.svg"
import CircleBg from "../components/ui/CircleBg";

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
        currentSource,
		isMobile
    } = useContext(ContentContext);

    useEffect(() => {
        const lessonsList = currentTask?.value || [];
        const { filteredLessonsList, lessonToSet } = getFilteredLessons({
            lessonsList,
            currentLevel,
            currentLesson,
            hasLevels: !!currentTask.levels,
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
                <div className={clsx("w-full max-w-4xl mx-auto align-middle bg-orange-100 border-4 border-s-gray-100 rounded-2xl px-3.5 pb-3.5 pt-1 flex gap-4 bg-opacity-80",
					isMobile ? "mb-4" : "mb-6"
				)}>
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
                <div className="relative w-full max-w-4xl mx-auto align-middle border-t-4 border-b-4 border-brown px-3.5 py-3.5 flex flex-col gap-4 bg-opacity-80 z-0">
					<CircleBg className={"-left-[6px] -top-2"}/>
					<CircleBg className={"-right-[6px] -top-2"}/>
					<CircleBg className={"-left-[6px] -bottom-2"}/>
					<CircleBg className={"-right-[6px] -bottom-2"}/>
					<Image
						src={bgTranslation}
						alt="Фон"
						layout="fill"
						objectFit="cover"
						// quality={100}
						className="absolute inset-0"
					/>
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
                        currentSource={currentSource}
                    />
                </div>
            </div>
        </>
    );
}
