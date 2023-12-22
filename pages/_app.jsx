import "../styles/global.css";
import Layout from "../components/layout/layout";
import { ContentContext } from "../context";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useRouter } from "next/navigation";

export default function App({ Component, pageProps }) {
  const [isAuth, setIsAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [isModalActive, setIsModalActive] = useState(false);

  const router = useRouter();

  useEffect(() => {
    readCookie();
  }, []);

  function readCookie() {
    const user = new Cookies().get("user");
    if (user) {
      setIsAuth(true);
      setCurrentUser(user);
    //   router.push("/menu");
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
		setIsModalActive
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContentContext.Provider>
  );
}
