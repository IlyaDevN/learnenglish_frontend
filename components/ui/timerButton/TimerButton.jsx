import clsx from "clsx";
import Image from "next/image";
import timerOnImgSrc from "./timer_on.svg";
import timerOffImgSrc from "./timer_off.svg";
import { useContext } from "react";
import { ContentContext } from "../../../context";

export function TimerButton({ className }) {
  const { isTimerOn, setIsTimerOn, isModalActive, isModalSettingsActive } = useContext(ContentContext);

  function buttonHandler() {
	setIsTimerOn(!isTimerOn);
  }

  return (
    <button
      className={clsx(
		"p-1 border-4 border-yellow-400 rounded-full",
		"transition-opacity duration-500 ease-in-out",
        isTimerOn ? "bg-gradient-to-br from-light_blue to-dark_blue" : "bg-gradient-to-br from-light_green to-dark_green",
        isModalActive || isModalSettingsActive ? "opacity-0 pointer-events-none" : "opacity-100",
        className,
      )}
      onClick={buttonHandler}
    >
      <Image
        className={clsx("h-6 w-6")}
        src={isTimerOn ? timerOnImgSrc : timerOffImgSrc}
        alt="Кнопка включения и выключения темера"
      />
    </button>
  );
}
