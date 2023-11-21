import clsx from "clsx";
import { useState } from "react";

export default function AuthButton({ children, className, isRegistered, setIsRegistered, isButtonActive }) {

  return (
    <button
      className={clsx(
        "text-2xl font-black text-yellow-900 uppercase",
		isButtonActive ? "text-opacity-100" : "text-opacity-50",
        className,
      )}
		onClick={() => setIsRegistered(!isRegistered)}
    >
      {children}
    </button>
  );
}
