// serverSentencesMenu.jsx
import { UiButton } from "../components/ui/UiButton";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import DirectionModeBlock from "../components/ui/menuBlocks/DirectionModeBlock";
import TaskModeBlock from "../components/ui/menuBlocks/TaskModeBlock";
import { ContentContext } from "../context";
import LevelModeBlock from "../components/ui/menuBlocks/LevelModeBlock";
import LessonModeBlock from "../components/ui/menuBlocks/LessonModeBlock";
import { getFilteredLessons } from "../utils";
import SourceModeBlock from "../components/ui/menuBlocks/SourceModeBlock";
import SentencesAiAmountModeBlock from "../components/ui/menuBlocks/SentencesAiAmountModeBlock";
import clsx from "clsx";

export default function ServerSentencesMenu() {
    const router = useRouter();
    const {
        currentTask,
        currentLevel,
        currentLesson,
		currentSource,
        setCurrentLesson,
        setCurrentLessonList,
		isMobile
    } = useContext(ContentContext);

	

    function menuButtonHandler() {
		if(currentSource.value === "ai-generated" && (
			currentTask.name === "orange playlist" || 
			currentLesson.name === "Mix" ||
			currentLesson.name === "скоро"
		)) {
			alert("AI недоступен для плейлиста 'ORANGE PLAYLIST', уроков 'MIX' и уроков в разработке ('скоро').");
			return;
		}
        router.push("/serverSentences");
    }

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
                <title>Выбор заданий для перевода - LearnEnglish</title>
                <meta
                    name="description"
                    content="Выберите категорию или уровень сложности заданий для перевода предложений с английского. Десятки упражнений для отработки навыков перевода."
                    key="desc"
                />
                <meta
                    name="keywords"
                    content="выбор заданий, уровни сложности, категории перевода, упражнения по английскому, практика предложений"
                />
            </Head>
            <div className="px-4">
                <div className={clsx("w-full max-w-4xl mx-auto bg-orange-100 border-4 border-s-gray-100 rounded-2xl px-3.5 bg-opacity-80",
					isMobile
					? "py-2"
					: "py-6"
				)}>
                    <div className={clsx("flex flex-col items-center",
						isMobile
						? "gap-2"
						: "gap-5"
					)}>
                        <p className="text-2xl font-black text-yellow-900 uppercase leading-4">
                            выберите задание
                        </p>
                        <DirectionModeBlock />
                        <TaskModeBlock />
                        {currentTask.levels && <LevelModeBlock />}
                        <LessonModeBlock />
						<SourceModeBlock />
						{currentSource.value === "ai-generated" && <SentencesAiAmountModeBlock />}
                        <UiButton onClick={menuButtonHandler}>Начать</UiButton>
                    </div>
                </div>
            </div>
        </>
    );
}
