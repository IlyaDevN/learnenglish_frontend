import clsx from "clsx";
import { useContext } from "react";
import { ContentContext } from "../../context";

export function MoveBackButton({ children, className, onClick }) {
  const { isModalActive, isModalSettingsActive } = useContext(ContentContext);

  return (
    <button
      className={clsx(
        "h-10 px-3 bg-gradient-to-b from-light_green to-dark_green border-4 border-yellow-400 rounded-[50px] text-xl leading-tight text-white font-black uppercase",
        "transition-opacity duration-500 ease-in-out",
		isModalActive || isModalSettingsActive
			? "opacity-0 pointer-events-none"
			: "opacity-100",
		className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
