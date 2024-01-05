import clsx from "clsx";
import { useState } from "react";

export default function AuthButton({ children, className, isRegistered, onclick, isButtonActive }) {
	
  function buttonHandler() {
    if (isButtonActive) {
      return;
    }
    onclick(!isRegistered);
  }

  return (
    <button
      className={clsx(
        "text-2xl font-black text-yellow-900 uppercase",
        isButtonActive ? "text-opacity-100" : "text-opacity-50",
        className,
      )}
      onClick={buttonHandler}
    >
      {children}
    </button>
  );
}
