import clsx from "clsx";

export function UiButton({ children, className, type, onClick }) {
  return (
    <button
      className={clsx(
        "h-14 px-4 bg-gradient-to-b from-[#97CE4E] to-[#58AA2C] shadow-[inset_0_25px_0_0_rgba(255,255,255,0.1)] border-4 border-yellow-400 rounded-[50px] text-xl leading-tight text-white font-black uppercase",
        className,
      )}
	  type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
