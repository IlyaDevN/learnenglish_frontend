import clsx from "clsx";

export function UiButton({ children, className, type, onClick }) {
    const hasCustomBg = className && (
		className.includes('bg-') ||
		className.includes('from-') ||
		className.includes('to-')
  	);

    return (
        <button
            className={clsx(
                "h-14 px-4 shadow-[inset_0_25px_0_0_rgba(255,255,255,0.1)] border-4 border-yellow-400 rounded-[50px] text-xl leading-tight text-white font-black uppercase",
                !hasCustomBg && "bg-gradient-to-b from-light_green to-dark_green",
				className,
            )}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
