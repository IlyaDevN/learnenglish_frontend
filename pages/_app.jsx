import "../styles/global.css";
import Layout from "../components/layout/layout";
import { ContentContext } from "../context";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
    const [isAuth, setIsAuth] = useState(false);
    const [currentUser, setCurrentUser] = useState();
    const [currentPage, setCurrentPage] = useState("/");
    const [isModalActive, setIsModalActive] = useState(false);
    const [isModalSettingsActive, setIsModalSettingsActive] = useState(false);
    const [isSoundOn, setIsSoundOn] = useState(true);
    const [isTimerOn, setIsTimerOn] = useState(false);
    const [isSettingsOn, setIsSettingsOn] = useState(false);
    const [isRusEng, setIsRusEng] = useState(true);

    const router = useRouter();

    useEffect(() => {
        readCookie();
    }, [currentPage]);

    function readCookie() {
        const cookies = new Cookies();
        const user = cookies.get("user");
        if (user) {
            setIsAuth(true);
            setCurrentUser(user);
            cookies.set("user", user, { path: "/", maxAge: "3600" });
        } else {
            router.push("/login");
        }
    }

    return (
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
                isRusEng,
                setIsRusEng,
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
    );
}
