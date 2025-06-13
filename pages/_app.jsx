import "../styles/global.css";
import Layout from "../components/layout/layout";
import { ContentContext } from "../context";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { checkAuth } from "../utils/api";
import { INITIAL_DIRECTION } from "../staticData/translation_directions";
import { INITIAL_TASK } from "../staticData/tasks";
import { INITIAL_LEVEL } from "../staticData/levels";
import localFont from "next/font/local";
import { english_galaxy } from "../staticData/english_galaxy";

const sourceSans3Local = localFont({
    src: [
        {
            path: "../public/fonts/SourceSans3-Regular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/fonts/SourceSans3-Italic.woff2",
            weight: "400",
            style: "italic",
        },
        {
            path: "../public/fonts/SourceSans3-Bold.woff2",
            weight: "700",
            style: "normal",
        },
        {
            path: "../public/fonts/SourceSans3-BoldItalic.woff2",
            weight: "700",
            style: "italic",
        },
        {
            path: "../public/fonts/SourceSans3-Black.woff2",
            weight: "900",
            style: "normal",
        },
        {
            path: "../public/fonts/SourceSans3-BlackItalic.woff2",
            weight: "900",
            style: "italic",
        },
    ],
    variable: "--font-source-sans-3",
    display: "swap",
});

export default function App({ Component, pageProps }) {
    const [isAuth, setIsAuth] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentPage, setCurrentPage] = useState("/");
    const [currentTask, setCurrentTask] = useState(INITIAL_TASK);
    const [currentLevel, setCurrentLevel] = useState(INITIAL_LEVEL);
    const [currentLesson, setCurrentLesson] = useState(
        english_galaxy.find(
            (lesson) => lesson.level === INITIAL_LEVEL.value && lesson.id === 0,
        ) || null,
    );
    const [currentLessonList, setCurrentLessonList] = useState([]);
    const [isModalActive, setIsModalActive] = useState(false);
    const [isModalSettingsActive, setIsModalSettingsActive] = useState(false);
    const [isSoundOn, setIsSoundOn] = useState(true);
    const [isTimerOn, setIsTimerOn] = useState(false);
    const [isSettingsOn, setIsSettingsOn] = useState(false);
    const [translationDirection, setTranslationDirection] = useState(
        INITIAL_DIRECTION.value,
    );
    const router = useRouter();

    useEffect(() => {
        async function isAuthed() {
            if (
                router.pathname === "/login" ||
                router.pathname === "/register"
            ) {
                setIsAuth(false);
                setCurrentUser(null);
                return;
            }

            const data = await checkAuth();

            if (data?.isAuthenticated) {
                setIsAuth(true);
                setCurrentUser(data.user);
            } else {
                setIsAuth(false);
                setCurrentUser(null);

                if (
                    router.pathname !== "/login" &&
                    router.pathname !== "/register"
                ) {
                    router.push("/login");
                }
            }
        }

        isAuthed();
        setCurrentPage(router.pathname);
    }, [router]);

    return (
        <div className={`${sourceSans3Local.variable} font-sans`}>
            <ContentContext.Provider
                value={{
                    isAuth,
                    setIsAuth,
                    currentUser,
                    setCurrentUser,
                    isModalActive,
                    setIsModalActive,
                    isModalSettingsActive,
                    setIsModalSettingsActive,
                    currentPage,
                    setCurrentPage,
                    currentTask,
                    setCurrentTask,
                    currentLevel,
                    setCurrentLevel,
                    currentLessonList,
                    setCurrentLessonList,
                    currentLesson,
                    setCurrentLesson,
                    translationDirection,
                    setTranslationDirection,
                    isSoundOn,
                    setIsSoundOn,
                    isTimerOn,
                    setIsTimerOn,
                    isSettingsOn,
                    setIsSettingsOn,
                }}
            >
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ContentContext.Provider>
        </div>
    );
}
