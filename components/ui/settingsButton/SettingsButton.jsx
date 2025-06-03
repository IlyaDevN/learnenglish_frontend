import clsx from "clsx";
import Image from "next/image";
import settingsOnImgSrc from "./settings_on.svg";
import settingsOffImgSrc from "./settings_off.svg";
import { useContext } from "react";
import { ContentContext } from "../../../context";

export function SettingsButton({ className }) {
  const { isModalSettingsActive, setIsModalSettingsActive, isModalActive, setIsModalActive } = useContext(ContentContext);

  function buttonHandler() {
	if(isModalActive) {
		setIsModalActive(false);
		setTimeout(() => {
			setIsModalSettingsActive(true);
		}, 500)
	} else {
		setIsModalSettingsActive(!isModalSettingsActive);
	}
  }

  return (
    <button
      className={clsx(
        isModalSettingsActive ? "bg-gradient-to-br from-light_blue to-dark_blue" : "bg-gradient-to-br from-light_green to-dark_green",
        "p-1 border-4 border-yellow-400 rounded-full",
        className,
      )}
      onClick={buttonHandler}
    >
      <Image
        className={clsx("h-6 w-6")}
        src={isModalSettingsActive ? settingsOnImgSrc : settingsOffImgSrc}
        alt="Кнопка включения и выключения настроек"
      />
    </button>
  );
}

