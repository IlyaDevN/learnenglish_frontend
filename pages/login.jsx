import clsx from "clsx";
import { Source_Sans_3 } from "next/font/google";
import { useRouter } from "next/router";
import { UiButton } from "../components/ui/UiButton";
import { sendLoginRequest } from "../utils/api";
import InputBlock from "../components/ui/InputBlock";

const sourceSans3 = Source_Sans_3({
    subsets: ["latin", "cyrillic"],
    weight: ["700", "900"],
});

export default function Login() {
    const router = useRouter();
	const REGEXP = {
        // NAME: /^[а-яА-ЯёЁa-zA-ZЁёЇїІіЄєҐґ']{2,20}$/,
        EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    };

    async function guestLogin() {
		const data = {
            email: "guest@gmail.com",
            password: "guest12345",
        };

		try {
			const isLoggined = await sendLoginRequest(data);
			if (isLoggined) {
				router.push("/");
			}
		} catch (error) {
			alert(error.message || "Не удалось войти в систему"); 
		}
    }

	async function formHandler(event) {

		event.preventDefault();
		const form = document.forms.authForm;
		const data = {
			email: form.elements.login_email.value,
			password: form.elements.login_password.value,
		};

		// if (!REGEXP.NAME.test(data.name)) {
		//     alert("Имя некорректное");
		//     return;
		// }
		if (!REGEXP.EMAIL.test(data.email)) {
			alert("e-mail не корректный");
			return;
		}
		if (!REGEXP.PASSWORD.test(data.password)) {
			alert("Пароль не корректный");
			return;
		}

		try {
			const isLoggined = await sendLoginRequest(data);
			if (isLoggined) {
				router.push("/");
			}
		} catch (error) {
			alert(error.message || "Не удалось войти в систему"); 
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
                    вход
                </p>
                <form
					className={clsx(
						sourceSans3.className,
						"w-full flex flex-col gap-5 bg-opacity-80 mb-5",
					)}
					name="authForm"
				>
					<InputBlock
						fieldName="login_email"
						fieldType="text"
						tip="e-mail"
						placeholder="Введите ваш e-mail"
					/>
					<InputBlock
						fieldName="login_password"
						fieldType="password"
						tip="пароль"
						placeholder="Введите ваш пароль"
					/>
					<UiButton type="submit" onClick={(event) => formHandler(event)}>
						войти
					</UiButton>
				</form>
				<UiButton className={"w-full mb-5"} onClick={() => router.push("/register")}>
                    регистрация
				</UiButton>
				<UiButton className={"w-full"} onClick={guestLogin}>
					гостевой режим
				</UiButton>
            </div>
        </div>
    );
}
