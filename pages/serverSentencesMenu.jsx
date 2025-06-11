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

export default function ServerSentencesMenu() {
    const router = useRouter();
    const {
        currentTask,
        currentLevel,
        currentLesson,
        setCurrentLesson,
        currentLessonList,
        setCurrentLessonList,
    } = useContext(ContentContext);

    function menuButtonHandler() {
        router.push("/serverSentences");
    }

    useEffect(() => {
        console.log("--- useEffect ServerSentencesMenu triggered ---");
        console.log("Current Task:", currentTask.name, "Current Level:", currentLevel?.name);

        const lessonsList = currentTask.value;
        let filteredLessonsList = [];

        if (currentTask.levels) {
            filteredLessonsList = lessonsList.filter(
                (item) => item.level === currentLevel?.value,
            );
        } else {
            filteredLessonsList = lessonsList;
        }

        // Обновляем currentLessonList в контексте
        console.log("Updating currentLessonList to:", filteredLessonsList);
        setCurrentLessonList(filteredLessonsList);

        let lessonToSet = null;

        if (filteredLessonsList.length > 0) {
            //Сравниваем по АДРЕСУ, так как он уникален
            const isCurrentLessonValidInNewList = currentLesson
                ? filteredLessonsList.some(
                      (lesson) => lesson.address === currentLesson.address,
                  )
                : false;

            if (isCurrentLessonValidInNewList) {
                // Если текущий урок действителен в новом списке (по адресу), оставляем его.
                lessonToSet = currentLesson;
                console.log("Keeping current lesson:", currentLesson.name);
            } else {
                // Если текущий урок недействителен (или его не было),
                // устанавливаем первый урок из нового списка.
                lessonToSet = filteredLessonsList[0];
                console.log("Setting lesson to first available:", lessonToSet.name);
            }
        } else {
            // Если список уроков пуст, устанавливаем специальный "урок-заглушку"
            lessonToSet = {
                id: 1000000,
                name: "Уроки в разработке",
                address: "https://", // Уникальный адрес для заглушки
            };
            console.log("No lessons available, setting 'Уроки в разработке'.");
        }

        // Обновляем currentLesson в контексте, только если он действительно изменился.
        // Сравниваем по АДРЕСУ, чтобы избежать лишних обновлений.
        if (lessonToSet.address !== currentLesson?.address) {
            console.log("Setting currentLesson in context to:", lessonToSet.name);
            setCurrentLesson(lessonToSet);
        } else {
            console.log("currentLesson is already correct, no update needed.");
        }

    }, [currentTask, currentLevel, currentLesson, setCurrentLesson, setCurrentLessonList]);

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