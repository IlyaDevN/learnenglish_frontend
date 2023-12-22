import { Source_Sans_3 } from "next/font/google";
import clsx from "clsx";

const sourceSans3 = Source_Sans_3({
  subsets: ["latin", "cyrillic"],
  weight: ["900"],
});

export default function ModalMenuButton({ name, destination, onClick }) {
  return (
    <button
      className={clsx(
        sourceSans3.className,
        "text-xl text-white font-black leading-tight uppercase text-center",
      )}
      onClick={() => onClick(destination)}
    >
      {name}
    </button>
  );
}
