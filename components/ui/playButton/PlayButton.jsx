import clsx from "clsx";
import Image from "next/image";
import playOnImgSrc from "./play_on.svg";

export function PlayButton({
  className,
  getSoundQuestion,
  getSoundAnswer,
  isQuestion,
}) {

  function buttonHandler() {
    if (isQuestion) {
	  getSoundQuestion();
    } else {	
	  getSoundAnswer();
    }
  }

  return (
    <button
      className={clsx("bg-gradient-to-br from-light_blue to-dark_blue p-1 border-4 border-yellow-400 rounded-full absolute top-1/2 -translate-y-1/2 right-[10px]",
        className,
      )}
      onClick={buttonHandler}
    >
      <Image
        className={clsx("h-6 w-6")}
        src={playOnImgSrc}
        alt="Кнопка включения и выключения звука"
      />
    </button>
  );
}
