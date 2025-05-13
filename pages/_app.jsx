// _app.jsx

import "../styles/global.css";
import Layout from "../components/layout/layout";
import { ContentContext } from "../context";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { checkAuth } from "../utils/api";

export default function App({ Component, pageProps }) {
    const [isAuth, setIsAuth] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentPage, setCurrentPage] = useState("/");
    const [isModalActive, setIsModalActive] = useState(false);
    const [isModalSettingsActive, setIsModalSettingsActive] = useState(false);
    const [isSoundOn, setIsSoundOn] = useState(true);
    const [isTimerOn, setIsTimerOn] = useState(false);
    const [isSettingsOn, setIsSettingsOn] = useState(false);
    const [isRusEng, setIsRusEng] = useState(true);
    const router = useRouter();

    useEffect(() => {
		async function isAuthed() {
			const data = await checkAuth();
			
			if(data?.isAuthenticated) {
				setIsAuth(true);
				setCurrentUser(data.user);
			} else {
				setIsAuth(false);
				if (router.pathname !== '/login') {
					router.push('/login');
				}
			}
		}
		
		isAuthed();
    }, [router]);

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