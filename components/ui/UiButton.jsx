import clsx from "clsx";

export function UiButton({ children, className, type, onClick }) {
  return (
    <button
      className={clsx(
        "h-14 px-4 bg-lime-500 border-4 border-yellow-400 rounded-[50px] text-xl leading-tight text-white font-black uppercase",
        className,
      )}
	  type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
