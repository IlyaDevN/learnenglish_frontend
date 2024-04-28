import clsx from "clsx";

export function InputSentenceField({
  className,
  value,
  onChange,
  placeholder,
  rows,
  textarea_ref
}) {

  return (
    <textarea
      className={clsx(
        "text-lg text-yellow-900 px-3.5 py-3 resize-none outline-none border-2 rounded-lg border-yellow-900 bg-white bg-opacity-50 shadow-lg placeholder-yellow-900 placeholder-opacity-50 placeholder:focus:text-transparent",
        className,
      )}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
	  ref={textarea_ref}
    ></textarea>
  );
}
