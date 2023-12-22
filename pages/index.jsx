import clsx from "clsx";
import { useContext, useEffect } from "react";
import { ContentContext } from "../context";
import { useRouter } from "next/navigation";
import { Cookies } from "react-cookie";
import ModalMenu from "../components/ModalMenu";

export default function HomePage() {
  const { isAuth, setIsAuth, currentUser, setCurrentUser } = useContext(ContentContext);
  const router = useRouter();
  
  useEffect(() => {
    const user = new Cookies().get("user");

    if (user) {
      setIsAuth(true);
      setCurrentUser(user);
    //   router.push("/menu");
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <div className="px-4 py-7">
      {/* <div
        className={clsx(
          sourceSans3.className,
          "w-full bg-orange-100 border-4 border-s-gray-100 rounded-2xl px-3.5 py-8 bg-opacity-80",
        )}
      >
        <div className="flex justify-evenly mb-7">
			
        </div>
      </div> */}
    </div>
  );
}
