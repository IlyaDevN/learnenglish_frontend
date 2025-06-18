import clsx from "clsx";
import { UiButton } from "../ui/UiButton";
import { PlayButton } from "../ui/playButton/PlayButton";
import { ContentField } from "../ui/ContentField";
import { InputSentenceField } from "../ui/InputSentenceField";
import { useState, useRef, useEffect, useContext } from "react";
import AudioPlayer from "../ui/AudioPlayer";
import { getTheSound } from "../../voiceAPI";
import { ContentContext } from "../../context";
import TimerButtonBlock from "../ui/TimerButtonsBlock";
import { sendTranslationLog } from "../../utils/api";

export default function LessonTranslation({
    initialData,
    setInitialData,
    isDataAvailable,
    setIsDataAvailable,
    translationsCounter,
    setTranslationsCounter,
    isStarted,
    setIsStarted,
    count,
    setLoading,
    resetTrigger,
    currentSource,
	amountOfGeneratedSentences
}) {
    const [sentences, setSentences] = useState([]);
    const [randomNumber, setRandomNumber] = useState(null);
    const [currentAnswer, setCurrentAnswer] = useState(null);
    const [inputContent, setInputContent] = useState("");
    const [isAnswerShown, setIsAnswerShown] = useState(false);
    const [questionAudioSrc, setQuestionAudioSrc] = useState();
    const [answerAudioSrc, setAnswerAudioSrc] = useState();
    const {
        translationDirection,
        isSoundOn,
        isTimerOn,
        currentUser,
        currentLevel,
        currentLessonList,
        currentLesson,
    } = useContext(ContentContext);
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

    useEffect(() => {
        setIsDataAvailable(false);
        setSentences([]);
        setRandomNumber(null);
        setCurrentAnswer(null);
        setInputContent("");
        setTranslationsCounter(0);
        tempCountQuestion.current = null;
        tempCountAnswer.current = null;
        setIsStarted(false);
    }, [resetTrigger]);

    // Получение первого аудио вопроса при первой загрузке
    // Если оставить только randomNumber, то он иногда повторяется и useEffect не срабатывает,
    // добавление translationsCounter еще одной зависимостью устранит эту проблему.
    useEffect(() => {
        if (!isSoundOn || !isDataAvailable) {
            return;
        }
        getSoundQuestion();
    }, [randomNumber, translationDirection, translationsCounter]);

    // useEffect(() => {
    //     if (sentences[randomNumber]) {
    //         handleNextSentence();
    //     }
    // }, []);

    useEffect(() => {
        if (currentAnswer) {
            handleShowTranslation();
        }
        setQuestionAudioSrc(answerAudioSrc);
        setAnswerAudioSrc(questionAudioSrc);
    }, [translationDirection]);

    useEffect(() => {
        // обработка кнопки enter
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

	async function handleStart() {
        if (!currentLesson) {
            return;
        }
        if (currentLesson.name == "Mix") {
            setLoading(true);

            const lessonsAmount = currentLessonList.length - 1;
            let allTheSentences = [];
            for (let i = 1; i <= lessonsAmount; i++) {
                let newLesson = currentLessonList[i];

                const response = await fetch(newLesson.address);
                const data = await response.json();
                allTheSentences.push(...data);
            }
            setInitialData(allTheSentences);
            count.current = allTheSentences.length;
            setIsDataAvailable(true);
            setLoading(false);
        } else {
            setLoading(true);
            const response = await fetch(currentLesson.address);
            const data = await response.json();
			if( currentSource?.value === "ai-generated" && data.length > 0) {
				const generatedSentences = await generateAiPair(translationDirection, amountOfGeneratedSentences, data);
				setInitialData(generatedSentences);
				count.current = generatedSentences.length;
			}
			if( currentSource?.value == "base" && data.length > 0) {
				count.current = data.length;
				setInitialData(data);
			}
            setIsDataAvailable(true);
            setLoading(false);
            // textarea_ref.current.focus(); //input autofocus
        }
        setIsStarted(true);
    }

    async function handleNextSentence() {
        if (!isStarted || !isDataAvailable) {
            return;
        }
		if(isStarted && sentences.length === 0) {
			alert("Урок окончен. Пожалуйста, начните урок сначала или выберите другой урок.");
			return;
		}
        if (count.current === 0 && currentSource?.value !== "ai-generated") {
            return;
        }

        const data = {
            originalText:
                translationDirection === "ru-en"
                    ? sentences[randomNumber].rus_sentence
                    : sentences[randomNumber].eng_sentence,
            originalTranslation:
                translationDirection === "ru-en"
                    ? sentences[randomNumber].eng_sentence
                    : sentences[randomNumber].rus_sentence,
            userTranslation: inputContent,
            isTranslationOpen: isAnswerShown,
            userEmail: currentUser.email,
            lesson: currentLesson.id,
            level: currentLevel.value,
            sentenceId: currentSource?.value === "ai-generated" 
				? "AI"
				: sentences[randomNumber].lesson + sentences[randomNumber].id,
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
        if (!isStarted) {
            return;
        }
        if (sentences[randomNumber] && sentences.length) {
            setCurrentAnswer(
                translationDirection === "ru-en"
                    ? sentences[randomNumber].eng_sentence
                    : sentences[randomNumber].rus_sentence,
            );
        } else {
            setCurrentAnswer(
                translationDirection === "ru-en"
                    ? "The lesson is over."
                    : "Урок окончен.",
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
                if (translationDirection === "ru-en") {
                    return sentences[randomNumber].rus_sentence;
                } else {
                    return sentences[randomNumber].eng_sentence;
                }
            } else {
                if (translationDirection === "ru-en") {
                    return "Урок окончен.";
                } else {
                    return "The lessons is over.";
                }
            }
        }

        const phrase = getPhrase();
        const voiceName =
            translationDirection === "ru-en"
                ? VOICE_NAME_RUSSIAN
                : VOICE_NAME_ENGLISH;
        const language =
            translationDirection === "ru-en"
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
                            //console.log("Trying to play the question again...");
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
                if (translationDirection === "ru-en") {
                    return sentences[randomNumber].eng_sentence;
                } else {
                    return sentences[randomNumber].rus_sentence;
                }
            } else {
                if (translationDirection === "ru-en") {
                    return "The lesson is over";
                } else {
                    return "Конец";
                }
            }
        }

        const phrase = getPhrase();
        const voiceName =
            translationDirection === "ru-en"
                ? VOICE_NAME_ENGLISH
                : VOICE_NAME_RUSSIAN;
        const language =
            translationDirection === "ru-en"
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
                            //console.log("Trying to play the answer again...");
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
        setIsStarted(true);
    }

	async function generateAiPair(direction, amountOfGeneratedSentences, examplesData = initialData) {

			try {
				setLoading(true);

				// Для анализа всегда используем initialData как базу для лексики и грамматики
				// независимо от того, какой источник выбран для практики.
				const examplesRu = examplesData // Используем initialData для контекста генерации
					.map((s) => s.rus_sentence)
					.join("; ");
				const examplesEn = examplesData
					.map((s) => s.eng_sentence)
					.join("; ");

				// Если initialData пуст, мы не можем генерировать на основе чего-либо
				if (examplesData.length === 0) {
					throw new Error("Нет базовых предложений для анализа. Пожалуйста, выберите урок с базовыми предложениями.");
				}


				let prompt;
				if (direction === "ru-en") {
					prompt = `Проанализируй следующие пары предложений (русский; английский): ${examplesRu}; ${examplesEn}. Выдели из них все слова, словосочетания, лексику и грамматические конструкции.
					На основе сделанных выводов сгенерируй ${amountOfGeneratedSentences} НОВЫХ коротких русских предложений.
					Затем переведи каждое русское предложение на английский язык, используя только те слова, грамматические времена и лексические конструкции, которые были в предоставленных примерах. Предложения не должны в точности совпадать с предложениями из примеров.
					Весь свой анализ оставь при себе.
					Ответь мне ТОЛЬКО в формате JSON-массива, где каждый элемент - это объект с двумя полями: "russian" для русского предложения и "english" для английского перевода. Например: [{"russian": "Привет, мир!", "english": "Hello, world!"}, {"russian": "Как дела?", "english": "How are you?"}]`;
				} else { // direction === "en-ru"
					prompt = `Проанализируй следующие пары предложений (русский; английский): ${examplesRu}; ${examplesEn}. Выдели из них все слова, словосочетания, лексику и грамматические конструкции.
					На основе сделанных выводов сгенерируй ${amountOfGeneratedSentences} НОВЫХ коротких английских предложений.
					Затем переведи каждое английское предложение на русский язык, используя только те слова, грамматические времена и лексические конструкции, которые были в предоставленных примерах. Предложения не должны в точности совпадать с предложениями из примеров.
					Весь свой анализ оставь при себе.
					Ответь мне ТОЛЬКО в формате JSON-массива, где каждый элемент - это объект с двумя полями: "russian" для русского предложения и "english" для английского перевода. Например: [{"russian": "Привет, мир!", "english": "Hello, world!"}, {"russian": "Как дела?", "english": "How are you?"}]`;
				}

				console.log("Отправляемый промпт:", prompt);
				
				const genRes = await fetch("/api/ai/generate", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ prompt }),
				});
				const genData = await genRes.json();
				console.log("AI generation response:", genData);

				if (!genData.success || !Array.isArray(genData.pairs) || genData.pairs.length === 0) {
					throw new Error("Ошибка генерации предложений или некорректный формат ответа от AI. Ожидается массив объектов.");
				}

				const newGeneratedSentences = genData.pairs.map(pair => ({
					rus_sentence: pair.russian,
					eng_sentence: pair.english
				}));
				console.log("Newly generated sentences:", newGeneratedSentences);
				return newGeneratedSentences;
			} catch (e) {
				alert("Ошибка генерации: " + e.message);
			}
		}
		
    return (
        <>
            <ContentField>
                {isDataAvailable &&
                    (sentences.length
                        ? translationDirection === "ru-en"
                            ? sentences[randomNumber]?.rus_sentence
                            : sentences[randomNumber]?.eng_sentence
                        : translationDirection === "ru-en"
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
