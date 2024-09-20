import { useContext } from "react";
import { ContentContext } from "../../context";

export default function ReverseLangButton() {
  const { isRusEng, setIsRusEng } = useContext(ContentContext);

  return (
    <button
      className="w-[80px] flex justify-around bg-blue-500 focus:outline-none border-4 rounded-lg border-yellow-400 text-xl text-white px-1"
      onClick={() => setIsRusEng(() => !isRusEng)}
    >
      <span>{isRusEng ? "ru" : "en"}</span>
      <span className="relative top-[2px]">&#10132;</span>
      <span>{isRusEng ? "en" : "ru"}</span>
    </button>
  );
}
