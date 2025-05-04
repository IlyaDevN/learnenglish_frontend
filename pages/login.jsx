import clsx from "clsx";
import { Source_Sans_3 } from "next/font/google";
import LoginForm from "../components/LoginForm";
import { useRouter } from "next/router";
import { UiButton } from "../components/ui/UiButton";
import { Cookies } from "react-cookie";

const sourceSans3 = Source_Sans_3({
    subsets: ["latin", "cyrillic"],
    weight: ["700", "900"],
});

export default function Login() {
    const router = useRouter();

    function gestModeButtonHandler() {
        const cookies = new Cookies();
        cookies.set("user", "guest@gmail.com", { path: "/", maxAge: "3600" });
        router.push("/");
    }

    return (
        <div className="px-4">
            <div
                className={clsx(
                    sourceSans3.className,
                    "w-full max-w-4xl mx-auto align-middle bg-orange-100 border-4 border-s-gray-100 rounded-2xl px-3.5 py-8 bg-opacity-80",
                )}
            >
                <p className="text-center mb-7 text-2xl font-black text-yellow-900 uppercase">
                    вход
                </p>
                <LoginForm />
                <UiButton
                    className={"w-full mb-5"}
                    onClick={() => router.push("/register")}
                >
                    регистрация
                </UiButton>
                <UiButton className={"w-full"} onClick={gestModeButtonHandler}>
                    гостевой режим
                </UiButton>
            </div>
        </div>
    );
}
