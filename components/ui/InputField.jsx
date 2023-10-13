import clsx from "clsx";

export function InputField({ className }) {
  return (
    <textarea
      className={clsx(
        "text-base px-3.5 py-3 resize-none outline-none border-2 rounded-lg border-yellow-900 bg-white bg-opacity-50 shadow-lg",
        className,
      )}
	  placeholder="Напишите перевод"
    ></textarea>
  );
}
