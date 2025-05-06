import clsx from "clsx";
import InputBlock from "./ui/InputBlock";
import { Source_Sans_3 } from "next/font/google";
import { UiButton } from "./ui/UiButton";
import Link from "next/link";
import { getCookie } from "../functions";

const sourceSans3 = Source_Sans_3({
    subsets: ["latin", "cyrillic"],
    weight: ["400", "700", "900"],
});

export default function RegisterForm() {
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
				"http://learnenglish.pp.ua/api/register/",
				{
					method: "post",
					headers: { 
						"Content-type": "application/json"
					},
					body: JSON.stringify(data),
				},
			);
	
			const result = await response.json();
	
			if (response.status === 201) {
				alert(`${result.username}, your registration complete!`);
				document.forms.registerForm.reset();
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
        <form
            className={clsx(
                sourceSans3.className,
                "w-full flex flex-col gap-5 bg-opacity-80",
            )}
            name="registerForm"
        >
            <InputBlock
                fieldName="user_name"
                fieldType="text"
                tip="имя"
                placeholder="Ведите ваше имя"
            />
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
            <InputBlock
                fieldName="user_password_confirm"
                fieldType="password"
                tip="повторите пароль"
            />
            <UiButton type="submit" onClick={(event) => formHandler(event)}>
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
    );
}
