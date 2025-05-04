import clsx from "clsx";
import InputBlock from "./ui/InputBlock";
import { Source_Sans_3 } from "next/font/google";
import { UiButton } from "./ui/UiButton";
import { useRouter } from "next/router";
import { ContentContext } from "../context";
import { useContext } from "react";
import { Cookies } from "react-cookie";

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
  const { isAuth, setIsAuth, currentUser, setCurrentUser } = useContext(ContentContext);

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
	
	try {
		const response = await fetch("http://localhost:8000/api/login/", {
			method: "post",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(data),
		});

		const result = await response.json();

		if (response.status === 200) {
			alert(`Thank you! ${result.message}`);
			const cookies = new Cookies();
			cookies.set("user", data.email, { path: '/', maxAge: "3600" });
			setIsAuth(true);
			setCurrentUser(data.email);
			router.push("/");
		} else {
			alert(`Oops! ${result.message}`);
		}
	} catch (error) {
		console.error("Fetch error:", error);
		alert("An error occurred while communicating with the server.");
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
