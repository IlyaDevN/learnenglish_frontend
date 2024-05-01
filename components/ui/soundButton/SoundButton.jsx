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
        "p-1 bg-blue-500 border-4 border-yellow-400 rounded-full",
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
