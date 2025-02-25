import Counter from "../Counter";
import { UiButton } from "./UiButton";
import { useState, useEffect, useRef} from "react";
import NoSleep from "nosleep.js";

export default function TimerButtonBlock({ nextSentence, showTranslation, isDataAvailable }) {

  const [timerTimeout, setTimerTimeout] = useState(18);
  const [timerCount, setTimerCount] = useState(timerTimeout);
  const [timeInterval, setTimeInterval] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [sentenceChangeState, setSentenceChangeState] = useState(true);
  const [translationChangeState, setTranslationChangeState] = useState(true);
  const isInitialMountSentence = useRef(true);
  const isInitialTranslation = useRef(true);

  useEffect(()=> {
	if(isInitialMountSentence.current) {
		isInitialMountSentence.current = false;
		return;
	} 
	nextSentence();
  }, [sentenceChangeState])

  useEffect(()=> {
	if(isInitialTranslation.current) {
		isInitialTranslation.current = false;
		return;
	} 
	showTranslation();
  }, [translationChangeState])

  useEffect(()=> {
	resetTimer();
	setTimerCount(timerTimeout);
  },[timerTimeout])

  useEffect(() => {
    let isEnableNoSleep = false;
    const noSleep = new NoSleep();
    document.addEventListener(
      `click`,
      function enableNoSleep() {
        document.removeEventListener(`click`, enableNoSleep, false);
        noSleep.enable();
        isEnableNoSleep = true;
      },
      false
    );
    return () => {
      if (isEnableNoSleep) {
        noSleep.disable();
      }
    };
  }, []);

  const startTimer = () => {
	if(!isDataAvailable) {
		alert("Выберите уровень, а затем урок");
		return;
	}

	if(isStarted) {
		return;
	}
	setIsStarted(true);

    setTimeInterval(
      setInterval(() => {
        setTimerCount((prev) => {
          if(prev == 5) {
			setTranslationChangeState((old) => !old);
		  } 
		  if (prev == 0) {
			setSentenceChangeState((old) => !old);
            resetTimer();
          } 
		  return prev - 1;
        });
      }, 1000),
    );
  };

//   const pauseTimer = () => {
//     clearInterval(timeInterval);
//   };

  const resetTimer = () => {
    setTimerCount(timerTimeout);
    clearInterval(timeInterval);
	setIsStarted(false);
  };

  function increaseTime() {
	setTimerTimeout((oldValue) => oldValue + 1);
  }

  function decreaseTime() {
	setTimerTimeout((oldValue) => oldValue - 1);
  }

  return (
	<div className="flex gap-4 flex-col">
		<div className="flex justify-between">
			<UiButton className="min-w-[100px]" onClick={startTimer}>Старт</UiButton>
			{/* <UiButton onClick={pauseTimer}>Pause</UiButton> */}
			<Counter value={timerCount} className={"w-14"}/>
			<UiButton className="min-w-[100px]" onClick={resetTimer}>Стоп</UiButton>
    	</div>
		<div className="flex justify-between"> 
			<UiButton className={"w-14"} onClick={decreaseTime}>-</UiButton>
			<div className="flex justify-center items-center bg-white px-4 border-4 rounded-full border-yellow-400 text-xl text-yellow-900 uppercase" >
				Таймер
			</div>
			<UiButton className={"w-14"} onClick={increaseTime}>+</UiButton>
		</div> 
	</div>
    
  );
}
