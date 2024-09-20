import clsx from "clsx";
import { Source_Sans_3 } from "next/font/google";
import { SoundButton } from "./ui/soundButton/SoundButton";
import ReverseLangButton from "./ui/ReverseLangButton";

const sourceSans3 = Source_Sans_3({
    subsets: ["latin", "cyrillic"],
    weight: ["700", "900"],
  });

export default function Footer() {
  
  return (
    <footer
      className={clsx(
		sourceSans3.className,
        "w-full h-14 px-4 py-2 bg-lime-500 bg-opacity-80 flex justify-between items-center fixed bottom-0",
      )}
    >
      <div className="w-full max-w-4xl px-[20px] m-auto flex justify-between">
        <SoundButton />
		<ReverseLangButton />
      </div>
    </footer>
  );
}
