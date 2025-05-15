import clsx from "clsx";
import Image from "next/image";
import playOnImgSrc from "./logoutButton.svg";
import { logout } from "../../../utils/api";
import { useRouter } from "next/router";

export function LogoutButton({ className }) {
    const router = useRouter();

    function logoutHandler() {
        logout();
        router.push("/login");
    }

    return (
        <button
            className={clsx("rounded-full", className)}
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
