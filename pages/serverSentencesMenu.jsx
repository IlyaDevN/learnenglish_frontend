// serverSentencesMenu.jsx
import { UiButton } from "../components/ui/UiButton";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import Head from "next/head";
import DirectionModeBlock from "../components/ui/menuBlocks/DirectionModeBlock";
import TaskModeBlock from "../components/ui/menuBlocks/TaskModeBlock";
import { ContentContext } from "../context";
import LevelModeBlock from "../components/ui/menuBlocks/LevelModeBlock";
import LessonModeBlock from "../components/ui/menuBlocks/LessonModeBlock";
import { getFilteredLessons } from "../utils";

export default function ServerSentencesMenu() {
    const router = useRouter();
    const {
        currentTask,
        currentLevel,
        currentLesson,
        setCurrentLesson,
        setCurrentLessonList,
    } = useContext(ContentContext);

    function menuButtonHandler() {
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
                <div className="w-full max-w-4xl mx-auto bg-orange-100 border-4 border-s-gray-100 rounded-2xl px-3.5 py-8 bg-opacity-80">
                    <div className="flex flex-col items-center gap-5">
                        <p className="text-2xl font-black text-yellow-900 uppercase">
                            выберите задание
                        </p>
                        <DirectionModeBlock />
                        <TaskModeBlock />
                        {currentTask.levels && <LevelModeBlock />}
                        <LessonModeBlock />
                        <UiButton onClick={menuButtonHandler}>Начать</UiButton>
                    </div>
                </div>
            </div>
        </>
    );
}
