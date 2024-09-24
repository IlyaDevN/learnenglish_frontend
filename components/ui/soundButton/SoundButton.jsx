import clsx from "clsx";
import Image from "next/image";
import soundOnImgSrc from "./sound_on.svg";
import soundOffImgSrc from "./sound_off.svg";
import { useContext } from "react";
import { ContentContext } from "../../../context";

export function SoundButton({ className }) {
  const { isSoundOn, setIsSoundOn } = useContext(ContentContext);

  function buttonHandler() {
    setIsSoundOn(!isSoundOn);
  }

  return (
    <button
      className={clsx(
        isSoundOn
          ? "bg-gradient-to-br from-light_blue to-dark_blue"
          : "bg-gradient-to-br from-light_green to-dark_green",
        "p-1 border-4 border-yellow-400 rounded-full",
        className,
      )}
      onClick={buttonHandler}
    >
      <Image
        className={clsx("h-6 w-6")}
        src={isSoundOn ? soundOnImgSrc : soundOffImgSrc}
        alt="Кнопка включения и выключения звука"
      />
    </button>
  );
}
