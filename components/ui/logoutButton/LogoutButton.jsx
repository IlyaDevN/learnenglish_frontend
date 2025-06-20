import clsx from "clsx";
import Image from "next/image";
import playOnImgSrc from "./logoutButton.svg";
import { logout } from "../../../utils/api";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ContentContext } from "../../../context";

export function LogoutButton({ className }) {
    const router = useRouter();
	const { isModalActive, isModalSettingsActive } = useContext(ContentContext);

    function logoutHandler() {
        logout();
        router.push("/login");
    }

    return (
        <button
            className={clsx(
				"rounded-full", 
				"transition-opacity duration-500 ease-in-out",
				isModalActive || isModalSettingsActive
					? "opacity-0 pointer-events-none"
		  			: "opacity-100",
				className)}
            onClick={logoutHandler}
        >
            <Image
                className={clsx("h-6 w-6")}
                src={playOnImgSrc}
                alt="Кнопка выхода"
            />
        </button>
    );
}
