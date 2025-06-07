import { useRouter } from "next/router";
import { SoundButton } from "./ui/soundButton/SoundButton";
import { TimerButton } from "./ui/timerButton/TimerButton";
import { SettingsButton } from "./ui/settingsButton/SettingsButton";
import ReverseLangButton from "./ui/ReverseLangButton";

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="w-full h-14 px-4 py-2 bg-lime-500 bg-opacity-80 flex justify-between items-center fixed bottom-0">
      <div className="w-full max-w-4xl px-[20px] m-auto flex justify-between">
	  {router.asPath == "/serverSentences" && <SoundButton /> }
	  {router.asPath == "/serverSentences" && <TimerButton /> }
      {router.asPath == "/serverSentences" && <ReverseLangButton /> }
      {router.asPath == "/serverSentences" && <SettingsButton /> }
      </div>
    </footer>
  );
}
