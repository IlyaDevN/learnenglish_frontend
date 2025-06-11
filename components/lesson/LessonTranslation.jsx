import clsx from "clsx";
import { UiButton } from "../../components/ui/UiButton";
import { PlayButton } from "../../components/ui/playButton/PlayButton";
import { ContentField } from "../../components/ui/ContentField";
import { InputSentenceField } from "../../components/ui/InputSentenceField";
import { useState, useRef, useEffect, useContext } from "react";
import AudioPlayer from "../../components/ui/AudioPlayer";
import { getTheSound } from "../../voiceAPI";
import { ContentContext } from "../../context";
import TimerButtonBlock from "../../components/ui/TimerButtonsBlock";
import { sendTranslationLog } from "../../utils/api";

export default function LessonTranslation({
    initialData,
    isDataAvailable,
    currentLevel,
    translationsCounter,
    setTranslationsCounter,
	isStarted,
	setIsStarted,
    count,
}) {
    const [sentences, setSentences] = useState([]);
    const [randomNumber, setRandomNumber] = useState(null);
    const [currentAnswer, setCurrentAnswer] = useState(null);
    const [inputContent, setInputContent] = useState("");
    const [isAnswerShown, setIsAnswerShown] = useState(false);
    const [questionAudioSrc, setQuestionAudioSrc] = useState();
    const [answerAudioSrc, setAnswerAudioSrc] = useState();
    const { isRusEng, isSoundOn, isTimerOn, currentUser } =
        useContext(ContentContext);
    const audioRefQuestion = useRef(null);
    const audioRefAnswer = useRef(null);
    const tempCountQuestion = useRef(null);
    const tempCountAnswer = useRef(null);
    const firstRenderQuestion = useRef(true);
    const firstRenderAnswer = useRef(true);
    //   const textarea_ref = useRef(); //input autofocus
    const LANGUAGE_CODE_RUSSIAN = "ru-Ru";
    const LANGUAGE_CODE_ENGLISH = "en-US";
    const VOICE_NAME_RUSSIAN = "ru-RU-Standard-C";
    const VOICE_NAME_ENGLISH = "en-US-Standard-C";

    // Инициализация предложений и выбор первого случайного предложения
    useEffect(() => {
        if (initialData && initialData.length > 0) {
            setSentences([...initialData]);
            const newRandomNumber = Math.floor(
                Math.random() * initialData.length,
            );
            setRandomNumber(newRandomNumber);
            setCurrentAnswer(null);
            setInputContent("");
            setTranslationsCounter(0);
            tempCountQuestion.current = null;
            tempCountAnswer.current = null;
        }
    }, [initialData, isDataAvailable]);

    // Получение первого аудио вопроса при первой загрузке
    // Если оставить только randomNumber, то он иногда повторяется и useEffect не срабатывает,
    // добавление translationsCounter еще одной зависимостью устранит эту проблему.
    useEffect(() => {
        if (!isSoundOn || !isDataAvailable) {
            return;
        }
        getSoundQuestion();
    }, [randomNumber, isRusEng, translationsCounter]);

    useEffect(() => {
        if (sentences[randomNumber]) {
            handleNextSentence();
        }
    }, []);

    useEffect(() => {
        if (currentAnswer) {
            handleShowTranslation();
        }
		setQuestionAudioSrc(answerAudioSrc);
		setAnswerAudioSrc(questionAudioSrc);
    }, [isRusEng]);

    useEffect(() => {
        function keydownHandler(e) {
            if (e.code === "Enter") {
                e.preventDefault();
                if (currentAnswer) {
                    handleNextSentence();
                } else {
                    handleShowTranslation();
                }
            }
        }

        document.addEventListener("keydown", keydownHandler);

        return () => document.removeEventListener("keydown", keydownHandler);
    }, [currentAnswer, handleShowTranslation]);

    function handleNextSentence() {
        if (!isDataAvailable) {
            return;
        }
        if (count.current === 0) {
            return;
        }

        const data = {
            originalText: isRusEng
                ? sentences[randomNumber].rus_sentence
                : sentences[randomNumber].eng_sentence,
            originalTranslation: isRusEng
                ? sentences[randomNumber].eng_sentence
                : sentences[randomNumber].rus_sentence,
            userTranslation: inputContent,
            isTranslationOpen: isAnswerShown,
            userEmail: currentUser.email,
            lesson: sentences[randomNumber].lesson,
            level: currentLevel,
            sentenceId:
                sentences[randomNumber].lesson + sentences[randomNumber].id,
        };

        sendTranslationLog(data);

        const updatedSentences = sentences.filter(
            (_, index) => index !== randomNumber,
        );
        setSentences(updatedSentences);
        const newRandomNumber = Math.floor(
            Math.random() * updatedSentences.length,
        );
        setRandomNumber(newRandomNumber);
        count.current -= 1;
        setCurrentAnswer(null);
        setInputContent("");
        setIsAnswerShown(false);
        setTranslationsCounter((oldCount) => oldCount + 1);
    }

    function handleShowTranslation() {
        if (sentences[randomNumber] && sentences.length) {
            setCurrentAnswer(
                isRusEng
                    ? sentences[randomNumber].eng_sentence
                    : sentences[randomNumber].rus_sentence,
            );
        } else {
            setCurrentAnswer(
                isRusEng ? "The lesson is over." : "Урок окончен.",
            );
        }
        if (isSoundOn) {
            getSoundAnswer();
        }
    }

    useEffect(() => {
        if (firstRenderQuestion.current) {
            firstRenderQuestion.current = false;
            return;
        }
        playSoundQuestion();
    }, [questionAudioSrc]);

    function getSoundQuestion() {
        if (!isDataAvailable) {
            return;
        }

        if (tempCountQuestion.current == translationsCounter) {
            audioRefQuestion.current.play();
            return;
        }

        function getPhrase() {
            if (sentences.length) {
                if (isRusEng) {
                    return sentences[randomNumber].rus_sentence;
                } else {
                    return sentences[randomNumber].eng_sentence;
                }
            } else {
                if (isRusEng) {
                    return "Урок окончен.";
                } else {
                    return "The lessons is over.";
                }
            }
        }

        const phrase = getPhrase();
        const voiceName = isRusEng ? VOICE_NAME_RUSSIAN : VOICE_NAME_ENGLISH;
        const language = isRusEng
            ? LANGUAGE_CODE_RUSSIAN
            : LANGUAGE_CODE_ENGLISH;

        getTheSound(phrase, voiceName, language, setQuestionAudioSrc);
        tempCountQuestion.current = translationsCounter;
    }

    function playSoundQuestion(attempt = 1) {
        stopAllAudio();
        if (audioRefQuestion.current) {
            const playPromise = audioRefQuestion.current.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        // console.log("Play question error (attempt: ", attempt, ")");
                    })
                    .catch((error) => {
                        console.error(
                            "Play question error (attempt: ",
                            attempt,
                            "):",
                            error,
                        );
                        if (attempt < 3) {
                            // Максимальное количество попыток
                            console.log("Trying to play the question again...");
                            setTimeout(
                                () => playSoundQuestion(attempt + 1),
                                250,
                            ); // Задержка перед повтором
                        } else {
                            console.error(
                                "Failed to play the question after 3 attempts.",
                            );
                        }
                    });
            }
        }
    }

    useEffect(() => {
        if (firstRenderAnswer.current) {
            firstRenderAnswer.current = false;
            return;
        }
        playSoundAnswer();
    }, [answerAudioSrc]);

    function getSoundAnswer() {
        if (!isDataAvailable) {
            return;
        }

        if (tempCountAnswer.current == translationsCounter) {
            audioRefAnswer.current.play();
            return;
        }

        function getPhrase() {
            if (sentences.length) {
                if (isRusEng) {
                    return sentences[randomNumber].eng_sentence;
                } else {
                    return sentences[randomNumber].rus_sentence;
                }
            } else {
                if (isRusEng) {
                    return "The lesson is over";
                } else {
                    return "Конец";
                }
            }
        }

        const phrase = getPhrase();
        const voiceName = isRusEng ? VOICE_NAME_ENGLISH : VOICE_NAME_RUSSIAN;
        const language = isRusEng
            ? LANGUAGE_CODE_ENGLISH
            : LANGUAGE_CODE_RUSSIAN;

        getTheSound(phrase, voiceName, language, setAnswerAudioSrc);
        tempCountAnswer.current = translationsCounter;
    }

    function playSoundAnswer(attempt = 1) {
        stopAllAudio();
        if (audioRefAnswer.current) {
            const playPromise = audioRefAnswer.current.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        // console.log("Play answer error (attempt: ", attempt, ")");
                    })
                    .catch((error) => {
                        console.error(
                            "Play answer error (attempt: ",
                            attempt,
                            "):",
                            error,
                        );
                        if (attempt < 3) {
                            // Максимальное количество попыток
                            console.log("Trying to play the answer again...");
                            setTimeout(() => playSoundAnswer(attempt + 1), 250); // Задержка перед повтором
                        } else {
                            console.error(
                                "Failed to play the answer after 3 attempts.",
                            );
                        }
                    });
            }
        }
    }

    function stopAudio(audioRef) {
        if (audioRef.current && !audioRef.current.paused) {
            audioRef.current.pause();
            //audioRef.current.currentTime = 0; // Сбросить на начало (по желанию)
        }
    }

    function stopAllAudio() {
        stopAudio(audioRefQuestion);
        stopAudio(audioRefAnswer);
    }

    function handleReset() {
        if (!confirm("Вы действительно хотите начать сначала?")) {
            return;
        }
        if (initialData) {
            setSentences([...initialData]);
            setRandomNumber(Math.floor(Math.random() * initialData.length));
            setCurrentAnswer(null);
            setInputContent("");
            setTranslationsCounter(0);
            tempCountQuestion.current = null;
            tempCountAnswer.current = null;
        }
    }

    function handleStart() {

	}

    return (
        <>
            <ContentField>
                {isDataAvailable &&
                    (sentences.length
                        ? isRusEng
                            ? sentences[randomNumber].rus_sentence
                            : sentences[randomNumber].eng_sentence
                        : isRusEng
                        ? "Урок окончен."
                        : "The lesson is over.")}
                <PlayButton
                    getSoundQuestion={getSoundQuestion}
                    isQuestion={true}
                ></PlayButton>
            </ContentField>
            <InputSentenceField
                placeholder="Напишите перевод"
                value={inputContent}
                onChange={(e) => setInputContent(e.target.value)}
                //   textarea_ref={textarea_ref} //input autofocus
            />
            <div className="relative">
                <UiButton
                    className={clsx(
                        currentAnswer &&
                            "pr-14 text-left text-lg text-yellow-900 font-normal normal-case bg-white bg-opacity-50 ",
                        "w-full min-h-[84px] h-auto rounded-lg",
                    )}
                    onClick={handleShowTranslation}
                >
                    {currentAnswer || "Показать перевод"}
                </UiButton>
                {currentAnswer && (
                    <PlayButton
                        className={"right-[13px]"}
                        getSoundAnswer={getSoundAnswer}
                        isQuestion={false}
                    ></PlayButton>
                )}
            </div>
            {isTimerOn ? (
                <TimerButtonBlock
                    nextSentence={handleNextSentence}
                    showTranslation={handleShowTranslation}
                    isDataAvailable={isDataAvailable}
                    playSoundQuestion={playSoundQuestion}
                    isSoundOn={isSoundOn}
                />
            ) : (
                <UiButton onClick={handleNextSentence}>
                    Следующее предложение
                </UiButton>
            )}
            <UiButton onClick={isStarted ? handleReset : handleStart}>
                {isStarted ? "Начать сначала" : "Начать"}
            </UiButton>
            <AudioPlayer src={questionAudioSrc} audioRef={audioRefQuestion} />
            <AudioPlayer src={answerAudioSrc} audioRef={audioRefAnswer} />
        </>
    );
}
