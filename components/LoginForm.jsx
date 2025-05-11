import clsx from "clsx";
import InputBlock from "./ui/InputBlock";
import { Source_Sans_3 } from "next/font/google";
import { UiButton } from "./ui/UiButton";
import { useRouter } from "next/router";
import { getCookie } from "../utils";

const sourceSans3 = Source_Sans_3({
    subsets: ["latin", "cyrillic"],
    weight: ["400", "700", "900"],
});

export default function LoginForm() {
    const REGEXP = {
        NAME: /^[а-яА-ЯёЁa-zA-ZЁёЇїІіЄєҐґ']{2,20}$/,
        EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    };

    const router = useRouter();

    function formHandler(event) {
        event.preventDefault();
        const form = document.forms.authForm;
        const data = {
            email: form.elements.user_email.value,
            password: form.elements.user_password.value,
        };

        if (!REGEXP.NAME.test(data.name)) {
            alert("Имя некорректное");
            return;
        }
        if (!REGEXP.EMAIL.test(data.email)) {
            alert("e-mail не корректный");
            return;
        }
        if (!REGEXP.PASSWORD.test(data.password)) {
            alert("Пароль не корректный");
            return;
        }

        sendForm(data);
    }

    async function sendForm(data) {
        const csrfToken = getCookie("csrftoken");

        try {
            const res = await fetch("https://learnenglish.pp.ua/api/login/", {
                method: "post",
                headers: {
                    "Content-type": "application/json",
                    "X-CSRFToken": csrfToken,
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                router.push("/");
            } else {
                const info = await res.json();
                alert(info?.error || "Не удалось войти в систему");
            }
        } catch (error) {
            console.error("Ошибка входа:", error);
        }
    }

    return (
        <form
            className={clsx(
                sourceSans3.className,
                "w-full flex flex-col gap-5 bg-opacity-80 mb-5",
            )}
            name="authForm"
        >
            <InputBlock
                fieldName="user_email"
                fieldType="text"
                tip="e-mail"
                placeholder="Введите ваш e-mail"
            />
            <InputBlock
                fieldName={"user_password"}
                fieldType="password"
                tip="пароль"
            />
            <UiButton type="submit" onClick={(event) => formHandler(event)}>
                войти
            </UiButton>
        </form>
    );
}
