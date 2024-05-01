import clsx from "clsx";
import { SoundButton } from "./ui/soundButton/SoundButton";

export default function Footer() {
  return (
    <footer
      className={clsx(
        "w-full h-14 px-4 py-2 bg-lime-500 bg-opacity-80 flex justify-between items-center fixed bottom-0",
      )}
    >
      <SoundButton/>
    </footer>
  );
}
