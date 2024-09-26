import Counter from "../Counter";
import { UiButton } from "./UiButton";
import { useState, useEffect, useRef} from "react";

export default function TimerButtonBlock({ nextSentence, showTranslation, isDataAvailable }) {

  const [timerTimeout, setTimerTimeout] = useState(12);
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
	setIsStarted()
  };

  return (
	<div>
		<div className="flex justify-between">
			<UiButton className="min-w-[100px]" onClick={startTimer}>Старт</UiButton>
			{/* <UiButton onClick={pauseTimer}>Pause</UiButton> */}
			<Counter value={timerCount} className={"w-14"}/>
			<UiButton className="min-w-[100px]" onClick={resetTimer}>Стоп</UiButton>
    	</div>
	</div>
    
  );
}
