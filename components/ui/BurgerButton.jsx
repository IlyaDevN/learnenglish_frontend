import clsx from "clsx";

export default function BurgerButton({ onClick }) {
  return (
    <button
      className="w-6 h-6 flex flex-col justify-center items-center gap-[3px]"
      onClick={onClick}
    >
      <div className={clsx("w-[18px] h-[2px] bg-white")}></div>
      <div className={clsx("w-[18px] h-[2px] bg-white")}></div>
      <div className={clsx("w-[18px] h-[2px] bg-white")}></div>
    </button>
  );
}
