import clsx from "clsx";
import { Source_Sans_3 } from "next/font/google";
import AuthButton from "../components/ui/AuthButton";
import AuthForm from "../components/authForm";
import { useState } from "react";

const sourceSans3 = Source_Sans_3({
  subsets: ["latin", "cyrillic"],
  weight: ["700", "900"],
});

export default function HomePage() {
  const [isRegistered, setIsRegistered] = useState(false);
	
  return (
    <div className="px-4 py-7">
      <div
        className={clsx(
          sourceSans3.className,
          "w-full bg-orange-100 border-4 border-s-gray-100 rounded-2xl px-3.5 py-8 bg-opacity-80",
        )}
      >
        <div className="flex justify-evenly mb-7">
          <AuthButton
            setIsRegistered={setIsRegistered}
			isRegistered={isRegistered}
			isButtonActive={isRegistered ? true : false}
          >
            вход
          </AuthButton>
          <AuthButton
            setIsRegistered={setIsRegistered}
			isRegistered={isRegistered}
			isButtonActive={isRegistered ? false : true}
          >
            регистрация
          </AuthButton>
        </div>
        <AuthForm isRegistered={isRegistered}/>
      </div>
    </div>
  );
}
