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
    const [timeInterval, setTimeInterval] = useState(null);
    const [isTimerStarted, setIsTimerStarted] = useState(false);
	const [isTimerPaused, setIsTimerPaused] = useState(false);
    const [sentenceChangeState, setSentenceChangeState] = useState(true);
    const [translationChangeState, setTranslationChangeState] = useState(true);
    const [color, setColor] = useState("");
    const isInitialMountSentence = useRef(true);
    const isInitialTranslation = useRef(true);

    useEffect(() => {
        if (isInitialMountSentence.current) {
            isInitialMountSentence.current = false;
            return;
        }
        nextSentence();
    }, [sentenceChangeState]);

    useEffect(() => {
        if (isInitialTranslation.current) {
            isInitialTranslation.current = false;
            return;
        }
        showTranslation();
    }, [translationChangeState]);

    useEffect(() => {
        resetTimer();
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

    async function startTimer() {
        if (!isDataAvailable) {
        	await loadSentencesAndStart();
        }

		if(timeInterval && !isTimerPaused){
			pauseTimer();
			setIsTimerPaused(true);
			return;
		}

        setIsTimerStarted(true);
		setIsTimerPaused(false);

        if (isSoundOn) {
            playSoundQuestion();
        }

        setTimeInterval(
            setInterval(() => {
                setTimerCount((prev) => {
                    if (prev == 5) {
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

      const pauseTimer = () => {
        clearInterval(timeInterval);
      };

    function resetTimer() {
        setTimerCount(timerTimeout);
        clearInterval(timeInterval);
        setIsTimerStarted(false);
    };

    function increaseTime() {
        if (timerTimeout == 60) {
            setColor("bg-gradient-to-br from-light_blue to-dark_blue");
            setTimeout(() => {
                setColor("");
            }, 200);
            return;
        }
        setTimerTimeout((oldValue) => oldValue + 1);
    }

    function decreaseTime() {
        if (timerTimeout == 10) {
            setColor("bg-gradient-to-br from-light_blue to-dark_blue");
            setTimeout(() => {
                setColor("");
            }, 200);
            return;
        }
        setTimerTimeout((oldValue) => oldValue - 1);
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
				<UiButton className="min-w-[100px]" onClick={handleReset}>
                    Сначала
                </UiButton>
                <UiButton className="min-w-[100px]" onClick={resetTimer}>
                    Стоп
                </UiButton>
            </div>
        </div>
    );
}
