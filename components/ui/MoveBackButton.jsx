import clsx from "clsx";

export function MoveBackButton({ children, className, onClick }) {
  return (
    <button
      className={clsx(
        "h-10 px-3 bg-gradient-to-b from-light_green to-dark_green border-4 border-yellow-400 rounded-[50px] text-xl leading-tight text-white font-black uppercase",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
