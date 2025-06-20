import { useRouter } from "next/router";
import { SoundButton } from "./ui/soundButton/SoundButton";
import { TimerButton } from "./ui/timerButton/TimerButton";
import { SettingsButton } from "./ui/settingsButton/SettingsButton";

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="w-full h-14 px-4 py-2 bg-green_80_mate flex justify-between items-center fixed bottom-0 z-10">
      <div className="w-full max-w-4xl px-[20px] m-auto flex justify-between">
	  {router.asPath == "/serverSentences" && <SoundButton /> }
	  {router.asPath == "/serverSentences" && <TimerButton /> }
      {router.asPath == "/serverSentences" && <SettingsButton /> }
      </div>
    </footer>
  );
}
