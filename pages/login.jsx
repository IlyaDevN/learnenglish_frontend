import clsx from "clsx";
import { Source_Sans_3 } from "next/font/google";
import AuthButton from "../components/ui/AuthButton";
import LoginForm from "../components/LoginForm";
import { useState, } from "react";
import RegisterForm from "../components/RegisterForm";

const sourceSans3 = Source_Sans_3({
  subsets: ["latin", "cyrillic"],
  weight: ["700", "900"],
});

export default function Login() {
  const [isRegistered, setIsRegistered] = useState(true);
	
  return (
    <div className="px-4">
      <div
        className={clsx(
          sourceSans3.className,
          "w-full max-w-4xl mx-auto align-middle bg-orange-100 border-4 border-s-gray-100 rounded-2xl px-3.5 py-8 bg-opacity-80",
        )}
      >
        <div className="flex justify-evenly mb-7">
          <AuthButton
            onclick={setIsRegistered}
			isRegistered={isRegistered}
			isButtonActive={isRegistered ? true : false}
          >
            вход
          </AuthButton>
          <AuthButton
            onclick={setIsRegistered}
			isRegistered={isRegistered}
			isButtonActive={isRegistered ? false : true}
          >
            регистрация
          </AuthButton>
        </div>
		{isRegistered 
		? <LoginForm/>
		: <RegisterForm setIsRegistered={setIsRegistered}/>}
      </div>
    </div>
  );
}
