import clsx from "clsx";
import { Source_Sans_3 } from "next/font/google";
import LoginForm from "../components/LoginForm";
import { useState, } from "react";

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
          <p className="text-center mb-7 text-2xl font-black text-yellow-900 uppercase">
			вход
		  </p>
			<LoginForm/>
      </div>
    </div>
  );
}
