import Image from "next/image";
import eyeImgSrc from "./eye.svg";

export default function ShowPassButton() {

  return (
    <button className="absolute w-6 h-6 top-2/4 -translate-y-1/2 right-4">
      <Image className="" src={eyeImgSrc} alt="Кнопка показа пароля" />
    </button>
  );
}
