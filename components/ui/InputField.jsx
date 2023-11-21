import clsx from "clsx";

export default function InputField({ className, fieldType, placeholder }) {
  const fieldStyle = {
    inputStyle:
      "w-full text-base text-yellow-900 px-3.5 py-3 resize-none outline-none border-2 rounded-lg border-yellow-900 bg-white bg-opacity-50 shadow-lg",
    placeholderStyle:
      "placeholder-yellow-900 placeholder-opacity-50 placeholder:text-lg placeholder:font-bold placeholder:focus:text-transparent",
  };

  return (
    <input
      className={clsx(
        fieldStyle.inputStyle,
        fieldStyle.placeholderStyle,
        className,
      )}
      type={fieldType}
      placeholder={placeholder}
      {...(fieldType === "password" ? {autoComplete: "on"} : {})}
    />
  );
}
