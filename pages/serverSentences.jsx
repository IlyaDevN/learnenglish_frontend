// serverSentences.jsx
import { useState, useRef, useEffect, useContext } from "react";
import Counter from "../components/Counter";
import Head from "next/head";
import LessonTranslation from "../components/lesson/LessonTranslation";
import { ContentContext } from "../context";
import LevelModeBlock from "../components/ui/menuBlocks/LevelModeBlock";
import LessonModeBlock from "../components/ui/menuBlocks/LessonModeBlock";

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
        //console.log("--- useEffect ServerSentencesMenu triggered ---");
        //console.log("Current Task:", currentTask.name, "Current Level:", currentLevel?.name);

        const lessonsList = currentTask?.value || [];
        let filteredLessonsList = [];

        if (currentTask.levels) {
            filteredLessonsList = lessonsList.filter(
                (item) => item.level === currentLevel?.value,
            );
        } else {
            filteredLessonsList = lessonsList;
        }

        // Обновляем currentLessonList в контексте
        //console.log("Updating currentLessonList to:", filteredLessonsList);
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
                //console.log("Keeping current lesson:", currentLesson.name);
            } else {
                // Если текущий урок недействителен (или его не было),
                // устанавливаем первый урок из нового списка.
                lessonToSet = filteredLessonsList[0];
                //console.log("Setting lesson to first available:", lessonToSet.name);
            }
        } else {
            // Если список уроков пуст, устанавливаем специальный "урок-заглушку"
            lessonToSet = {
                id: 1000000,
                name: "скоро",
                address: "https://", // Уникальный адрес для заглушки
            };
            //console.log("No lessons available, setting 'Уроки в разработке'.");
        }

        // Обновляем currentLesson в контексте, только если он действительно изменился.
        // Сравниваем по АДРЕСУ, чтобы избежать лишних обновлений.
        if (lessonToSet.address !== currentLesson?.address) {
            //console.log("Setting currentLesson in context to:", lessonToSet.name);
            setCurrentLesson(lessonToSet);
        } else {
            //console.log("currentLesson is already correct, no update needed.");
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
