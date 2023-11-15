import clsx from "clsx";

export function ContentField({ children, className, suppressHydrationWarning }) {
  return (
    <div
      className={clsx(
        "text-base text-yellow-900 px-3.5 py-3 border-2 rounded-lg border-yellow-900 bg-white bg-opacity-50 shadow-lg min-h-[84px]",
        className,
      )}
	  suppressHydrationWarning
    >
      {children}
    </div>
  );
}
