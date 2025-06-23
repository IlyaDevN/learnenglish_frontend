import Counter from "../Counter";
import { UiButton } from "./UiButton";
import { useState, useEffect, useRef } from "react";
import NoSleep from "nosleep.js";

export default function TimerButtonBlock({
    nextSentence,
    showTranslation,
    isDataAvailable,
    playSoundQuestion,
    isSoundOn,
	loadSentencesAndStart,
	handleReset,
	resetTrigger
}) {
    const [timerTimeout, setTimerTimeout] = useState(18);
    const [timerCount, setTimerCount] = useState(timerTimeout);
    const [isTimerStarted, setIsTimerStarted] = useState(false);
	const [isTimerPaused, setIsTimerPaused] = useState(false);
    const [sentenceChangeState, setSentenceChangeState] = useState(true);
    const [translationChangeState, setTranslationChangeState] = useState(true);
    const [color, setColor] = useState("");
    const isInitialMountSentence = useRef(true);
    const isInitialTranslation = useRef(true);
	const timeInterval = useRef(null);

    useEffect(() => {
		console.log("useEffect: nextSentence()");
        if (isInitialMountSentence.current) {
            isInitialMountSentence.current = false;
            return;
        }
        nextSentence();
    }, [sentenceChangeState]);

    useEffect(() => {
		console.log("useEffect: showTranslation()");
        if (isInitialTranslation.current) {
            isInitialTranslation.current = false;
            return;
        }
        showTranslation();
    }, [translationChangeState]);

    useEffect(() => {
		console.log("useEffect: resetTimer(); setIsTimerPaused(false); setTimerCount(timerTimeout);");
        resetTimer();
		setIsTimerPaused(false);
        setTimerCount(timerTimeout);
    }, [timerTimeout, resetTrigger]);

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
            false,
        );
        return () => {
            if (isEnableNoSleep) {
                noSleep.disable();
            }
        };
    }, []);

	useEffect(() => {
    	return () => clearInterval(timeInterval.current);
	}, []);

    async function startTimer() {
		console.log("startTimer");
		
        if (!isDataAvailable) {
			console.log("startTimer: before await loadSentencesAndStart");
        	await loadSentencesAndStart();
			console.log("startTimer: after await loadSentencesAndStart");
        }
		
		if(isTimerStarted && !isTimerPaused){
			pauseTimer();
			console.log("startTimer: pauseTimer and return");
			return;
		}
 
        setIsTimerStarted(true);
		setIsTimerPaused(false);
		clearInterval(timeInterval.current);

        if (isSoundOn) {
            playSoundQuestion();
        }

        timeInterval.current = 
            setInterval(() => {
                setTimerCount((prev) => {
                    if (prev === 5) {
						console.log("setInterval: if (prev === 5)");
                        setTranslationChangeState((old) => !old);
                    }
                    if (prev <= 1) {
						console.log("setInterval: if (prev <= 1)");
                        setSentenceChangeState((old) => !old);
						return timerTimeout;
                    }
					console.log("setInterval: prev - 1");
                    return prev - 1;
                });
            }, 1000)
    };

      const pauseTimer = () => {
        clearInterval(timeInterval.current);
		setIsTimerPaused(true);
		console.log("pauseTimer");
      };

    function resetTimer() {
        setTimerCount(timerTimeout);
        clearInterval(timeInterval.current);
        setIsTimerStarted(false);
		console.log("resetTimer");
    };

	function startFromTheBeginning() {
		handleReset();
		resetTimer();
		console.log("startFromTheBeginning");
	}

    function increaseTime() {
        if (timerTimeout === 60) {
            setColor("bg-gradient-to-br from-light_blue to-dark_blue");
            setTimeout(() => {
                setColor("");
            }, 200);
            return;
        }
        setTimerTimeout((oldValue) => oldValue + 1);
		console.log("increaseTime");
    }

    function decreaseTime() {
        if (timerTimeout === 10) {
            setColor("bg-gradient-to-br from-light_blue to-dark_blue");
            setTimeout(() => {
                setColor("");
            }, 200);
            return;
        }
        setTimerTimeout((oldValue) => oldValue - 1);
		console.log("decreaseTime");
    }

    return (
        <div className="flex gap-4 flex-col">
            
            <div className="flex justify-between">
				<UiButton className={"w-14"} onClick={increaseTime}>
                    +
                </UiButton>
                <Counter value={timerCount} className={"w-14"} bg={color} />
                <UiButton className={"w-14"} onClick={decreaseTime}>
                    -
                </UiButton>
            </div>
			<div className="flex justify-between">
                <UiButton className="min-w-[100px]" onClick={startTimer}>
                    {isTimerStarted 
						? isTimerPaused
							? "Старт"
							: "Пауза"
						: "Старт"
					}
                </UiButton>
				<UiButton className="min-w-[100px]" onClick={startFromTheBeginning}>
                    Сначала
                </UiButton>
                <UiButton className="min-w-[100px]" onClick={resetTimer}>
                    Стоп
                </UiButton>
            </div>
        </div>
    );
}
