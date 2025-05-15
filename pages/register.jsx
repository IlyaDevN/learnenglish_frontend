import { Source_Sans_3 } from "next/font/google";
import { UiButton } from "../components/ui/UiButton";
import { useRouter } from "next/router";
import InputBlock from "../components/ui/InputBlock";
import Link from "next/link";
import clsx from "clsx";

const sourceSans3 = Source_Sans_3({
    subsets: ["latin", "cyrillic"],
    weight: ["400", "700", "900"],
});

export default function Register() {
    const router = useRouter();
    const REGEXP = {
        NAME: /^[а-яА-ЯёЁa-zA-ZЁёЇїІіЄєҐґ']{2,20}$/,
        EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    };

    function formHandler(event) {
        event.preventDefault();
        const form = document.forms.registerForm;
        const data = {
            username: form.elements.user_name.value,
            email: form.elements.user_email.value,
            password: form.elements.user_password.value,
            first_name: "",
            last_name: "",
        };

        const passwordConfirm = form.elements.user_password_confirm.value;

        if (!REGEXP.NAME.test(data.username)) {
            alert("Имя некорректное");
            return;
        }
        if (!REGEXP.EMAIL.test(data.email)) {
            alert("e-mail не корректный");
            return;
        }
        if (!REGEXP.PASSWORD.test(data.password)) {
            alert("Пароль слишком слабый");
            return;
        }
        if (data.password !== passwordConfirm) {
            alert("Пароли не совпадают");
            return;
        }

        sendForm(data);
    }

    async function sendForm(data) {
        try {
            const response = await fetch(
                "https://learnenglish.pp.ua/api/register/",
                {
                    method: "post",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(data),
                },
            );

            const result = await response.json();

            if (response.status === 201) {
                alert(`${result.username}, your registration complete!`);
                document.forms.registerForm.reset();
                router.push("/");
                return;
            }
            if (response.status === 205) {
                alert("Этот e-mail уже зарегистрирован");
                return;
            }
            alert("Упс, что-то пошло не так");
        } catch (error) {
            console.error("Fetch error:", error);
            alert("An error occurred while communicating with the server.");
        }
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
                    регистрация
                </p>
                <form
                    className={clsx(
                        sourceSans3.className,
                        "w-full flex flex-col gap-5 bg-opacity-80",
                    )}
                    name="registerForm"
                >
                    <InputBlock
                        fieldName="register_name"
                        fieldType="text"
                        tip="имя"
                        placeholder="Ведите ваше имя"
                    />
                    <InputBlock
                        fieldName="register_email"
                        fieldType="text"
                        tip="e-mail"
                        placeholder="Введите ваш e-mail"
                    />
                    <InputBlock
                        fieldName="register_password"
                        fieldType="password"
                        tip="пароль"
                        placeholder="Введите ваш пароль"
                    />
                    <InputBlock
                        fieldName="register_password_confirm"
                        fieldType="password"
                        tip="повторите пароль"
                        placeholder="Повторите ваш пароль"
                    />
                    <UiButton
                        type="submit"
                        onClick={(event) => formHandler(event)}
                    >
                        подтвердить
                    </UiButton>
                    <div className="text-sm font-normal text-yellow-900 text-center">
                        Регистрируясь на сайте, вы соглашаетесь с
                        <Link className="text-lime-500" href="">
                            {" Правилами и условиями"}
                        </Link>{" "}
                        и
                        <Link className="text-lime-500" href="">
                            {" политикой конфиденциальности"}
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
