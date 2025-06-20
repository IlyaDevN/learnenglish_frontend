import clsx from "clsx";
import { ContentContext } from "../../context";
import { useContext } from "react";

export default function BurgerButton({ onClick }) {
  const { isModalActive, isModalSettingsActive } = useContext(ContentContext);

  return (
    <button
      className={clsx(
		"w-6 h-6 flex flex-col justify-center items-center gap-[3px]",
		"transition-opacity duration-500 ease-in-out",
		isModalSettingsActive
			? "opacity-0 pointer-events-none"
			: "opacity-100",
	)}
      onClick={onClick}
    >
      <div
        className={clsx(
          isModalActive ? "rotate-[45deg] -translate-y-[65%]" : "rotate-0",
          "transition-transform origin-left duration-500 w-[18px] h-[2px] bg-white",
        )}
      ></div>
      <div
        className={clsx(isModalActive ? "opacity-0" : "opacity-100",
		"transition-opacity duration-500 w-[18px] h-[2px] bg-white")}
      ></div>
      <div
        className={clsx(
          isModalActive ? "-rotate-[45deg] translate-y-[65%]" : "rotate-0",
          "transition-transform origin-left duration-500 w-[18px] h-[2px] bg-white",
        )}
      ></div>
    </button>
  );
}
