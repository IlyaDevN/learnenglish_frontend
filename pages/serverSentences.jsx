/* eslint-disable react-hooks/exhaustive-deps */
import clsx from "clsx";
import { TASKS } from "../staticData";
import { levels } from "../staticData/english_galaxy";
import { Source_Sans_3 } from "next/font/google";
import { UiButton } from "../components/ui/UiButton";
import { ContentField } from "../components/ui/ContentField";
import { InputSentenceField } from "../components/ui/InputSentenceField";
import { useState, useRef, useEffect, useContext } from "react";
import SelectLesson from "../components/ui/SelectLesson";
import Counter from "../components/Counter";
import AudioPlayer from "../components/ui/AudioPlayer";
import { getTheSound } from "../voiceAPI";
import { ContentContext } from "../context";

const sourceSans3 = Source_Sans_3({
  subsets: ["latin", "cyrillic"],
  weight: ["700", "900"],
});

export default function ServerSentences() {
  const [initialData, setInitialData] = useState();
  const [sentences, setSentences] = useState([]);
  const [randomNumber, setRandomNumber] = useState();
  const [currentAnswer, setCurrentAnswer] = useState();
  const [isDataAvailable, setIsDataAvailable] = useState(false);
  const [inputContent, setInputContent] = useState("");
  const [translationsCounter, setTranslationsCounter] = useState(0);
  const [currentTask, setCurrentTask] = useState();
  const [currentLessonsList, setCurrentLessonsList] = useState();
  const [questionAudioSrc, setQuestionAudioSrc] = useState();
  const [answerAudioSrc, setAnswerAudioSrc] = useState();
  const { isRusEng } = useContext(ContentContext);
  const { isSoundOn } = useContext(ContentContext);
  const count = useRef();
//   const textarea_ref = useRef(); //input autofocus
  const LANGUAGE_CODE_RUSSIAN = "ru-Ru";
  const LANGUAGE_CODE_ENGLISH = "en-US";
  const VOICE_NAME_RUSSIAN = "ru-RU-Standard-C";
  const VOICE_NAME_ENGLISH = "en-US-Standard-C"

  useEffect(() => {
    setCurrentTask(JSON.parse(localStorage.getItem("currentTask")));
  }, []);

  function selectLevel(value) {
	setIsDataAvailable(false);
	setSentences([]);
	setRandomNumber(getRandomNumber(0, count.current));
    setCurrentAnswer("");
    setInputContent("");
    setTranslationsCounter(0);

	const lessonsList = TASKS[currentTask];
	const sortedLessonsList = lessonsList.filter((item) => item.level == value);
	setCurrentLessonsList(sortedLessonsList);
  }

  async function selectLesson(value) {
    if (isDataAvailable) {
	  setCurrentAnswer("");
      setInputContent("");
	  setTranslationsCounter(0);
	  setIsDataAvailable(false);
	  setSentences([]);
	  setRandomNumber(getRandomNumber(0, count.current));
    }

	if(!value) {
		return;
	}

    const response = await fetch(value);
    const data = await response.json();
    setInitialData(data);
    setSentences(data);
    setRandomNumber(getRandomNumber(0, data.length));
    count.current = data.length;
    setIsDataAvailable(true);
	// textarea_ref.current.focus(); //input autofocus
  }

  useEffect(() => {
	if(!isSoundOn || !isDataAvailable) {
		return;
	}

	function getPhrase() {
		if(sentences.length) {
			if(isRusEng) {
				return sentences[randomNumber].rus_sentence;
			} else {
				return sentences[randomNumber].eng_sentence;
			}
		} else {
			if(isRusEng) {
				return "Конец";
			} else {
				return "The end";
			}			
		}
	}

	const phrase = getPhrase();
	const voiceName = isRusEng ? VOICE_NAME_RUSSIAN : VOICE_NAME_ENGLISH;
	const language = isRusEng ? LANGUAGE_CODE_RUSSIAN : LANGUAGE_CODE_ENGLISH;

	getTheSound(phrase, voiceName, language, setQuestionAudioSrc);

  }, [randomNumber, isRusEng]);

  useEffect(()=> { //Missing empty sentences)
	if(sentences[randomNumber]?.rus_sentence === "." || sentences[randomNumber]?.rus_sentence === "?") {
		handleNextSentence();
	}
  }, [count.current])

  useEffect(() => {
    if (currentAnswer) {
      handleShowTranslation();
    }
  }, [isRusEng]);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const response = await fetch(
  //         "https://ilyadevn.github.io/JsonApi/lesson_1.json",
  //       );
  //       const data = await response.json();
  //       setInitialData(data.db);
  //       setSentences([...sentences, ...data.db]);
  //       setRandomNumber(getRandomNumber(0, data.db.length));
  //       count.current = data.db.length;
  //       setIsDataAvailable(true);
  //     };

  //     fetchData();
  //   }, []);

  function handleNextSentence() {
    if (!isDataAvailable) {
      return;
    }
    if (count.current === 0) {
      return;
    }
    const sentencesCopy = sentences.slice();
    sentencesCopy.splice(randomNumber, 1);
    setSentences(sentencesCopy);
    count.current -= 1;
    setRandomNumber(getRandomNumber(0, count.current));
    setCurrentAnswer("");
    setInputContent("");

	if(sentences[randomNumber].rus_sentence === "." || sentences[randomNumber].rus_sentence === "?") {
		return;
	}

    setTranslationsCounter((oldCount) => oldCount + 1);
  }

  function handleShowTranslation() {
    if (!isDataAvailable) {
      return;
    }
    if (sentences.length) {
      setCurrentAnswer(
        isRusEng
          ? sentences[randomNumber].eng_sentence
          : sentences[randomNumber].rus_sentence,
      );
    } else {
      setCurrentAnswer("Урок окончен.");
    }

	if(!isSoundOn) {
		return;
	}

	function getPhrase() {
		if(sentences.length) {
			if(isRusEng) {
				return sentences[randomNumber].eng_sentence;
			} else {
				return sentences[randomNumber].rus_sentence;
			}
		} else {
			if(isRusEng) {
				return "Конец";
			} else {
				return "The end";
			}			
		}
	}

	const phrase = getPhrase();
	const voiceName = isRusEng ? VOICE_NAME_ENGLISH : VOICE_NAME_RUSSIAN;
	const language = isRusEng ? LANGUAGE_CODE_ENGLISH : LANGUAGE_CODE_RUSSIAN;

	getTheSound(phrase, voiceName, language, setAnswerAudioSrc);
  }

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
  }, [currentAnswer, handleNextSentence, handleShowTranslation]);

  function handleReset() {
    if (!isDataAvailable) {
      return;
    }
    if (!confirm("Вы действительно хотите начать сначала?")) {
      return;
    }
    resetTraining();
  }

  function resetTraining() {
    setSentences(initialData);
    count.current = initialData.length;
    setRandomNumber(getRandomNumber(0, count.current));
    setCurrentAnswer("");
    setInputContent("");
    setTranslationsCounter(0);
  }

  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
  }

  return (
    <div className="px-4">
      <div
        className={clsx(
          sourceSans3.className,
          "w-full max-w-4xl mx-auto align-middle bg-orange-100 border-4 border-s-gray-100 rounded-2xl px-3.5 py-3.5 flex flex-col gap-4 bg-opacity-80",
        )}
      >
        <div className="flex justify-between flex-wrap">
		  {currentTask == "english_galaxy" && <SelectLesson onChange={selectLevel} options={levels} selectName={"Уровень"}></SelectLesson>}
		  <Counter value={translationsCounter} />
          <SelectLesson onChange={selectLesson} options={currentTask == "english_galaxy" ? currentLessonsList : TASKS[currentTask]} selectName={"Урок"}/>
        </div>
        <ContentField>
          {isDataAvailable &&
            (sentences.length
              ? isRusEng
                ? sentences[randomNumber].rus_sentence
                : sentences[randomNumber].eng_sentence
              : "The end.")}
        </ContentField>
        <InputSentenceField
          placeholder="Напишите перевод"
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
        //   textarea_ref={textarea_ref} //input autofocus
        />
        <UiButton
          className={clsx(
            currentAnswer &&
              "text-left text-lg text-yellow-900 font-normal normal-case bg-white bg-opacity-50 ",
            "min-h-[84px] h-auto rounded-lg",
          )}
          onClick={handleShowTranslation}
        >
          {currentAnswer || "Показать перевод"}
        </UiButton>
        <UiButton onClick={handleNextSentence}>Следующее предложение</UiButton>
        <UiButton onClick={handleReset}>Начать сначала</UiButton>
		<AudioPlayer src={questionAudioSrc}/>
		<AudioPlayer src={answerAudioSrc}/>
      </div>
    </div>
  );
}
