import clsx from "clsx";
import { Source_Sans_3 } from "next/font/google";
import { UiButton } from "../components/ui/UiButton";
import { ContentField } from "../components/ui/ContentField";
import { InputSentenceField } from "../components/ui/InputSentenceField";
import { useState, useRef, useEffect } from "react";
import { Cookies } from "react-cookie";
import Counter from "../components/Counter";

const sourceSans3 = Source_Sans_3({
  subsets: ["latin", "cyrillic"],
  weight: ["700", "900"],
});

export default function OwnSentences() {
  const [initialData, setInitialData] = useState();
  const [sentences, setSentences] = useState([]);
  const [randomNumber, setRandomNumber] = useState();
  const [currentAnswer, setCurrentAnswer] = useState();
  const [isDataAvailable, setisDataAvailable] = useState(false);
  const [inputContent, setInputContent] = useState("");
  const [translationsCounter, setTranslationsCounter] = useState(0);
  const count = useRef();

  useEffect(() => {
    const cookies = new Cookies();
    const currentUser = cookies.get("user");

    const fetchData = async () => {
      const response = await fetch(
        "http://englishback.ua/getOwnSentences.php",
        {
          method: "post",
          header: { "Content-type": "application/json" },
          body: JSON.stringify(currentUser),
        },
      );
      const data = await response.json();
      setInitialData(data);
      setSentences([...sentences, ...data]);
      setRandomNumber(getRandomNumber(0, data.length));
      count.current = data.length;
      setisDataAvailable(true);
    };

    fetchData();
  }, []);

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
    setTranslationsCounter((oldCount) => oldCount + 1);
  }

  function handleShowTranslation() {
    if (!isDataAvailable) {
      return;
    }
    if (sentences.length) {
      setCurrentAnswer(sentences[randomNumber].eng_sentence);
    } else {
      setCurrentAnswer("Урок окончен");
    }
  }

  function handleReset() {
    if (!isDataAvailable) {
      return;
    }
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
    <div className="px-4 py-7">
      <div
        className={clsx(
          sourceSans3.className,
          "w-full bg-orange-100 border-4 border-s-gray-100 rounded-2xl px-3.5 py-3.5 flex flex-col gap-4 bg-opacity-80",
        )}
      >
        <Counter value={translationsCounter} />
        <ContentField>
          {isDataAvailable &&
            (sentences.length
              ? sentences[randomNumber].rus_sentence
              : "The lesson is over")}
        </ContentField>
        <InputSentenceField
          placeholder="Напишите перевод"
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
        />
        <UiButton
          className={clsx(
            currentAnswer
              ? "text-left text-lg text-white font-normal normal-case "
              : "",
            "min-h-[84px] rounded-lg",
          )}
          onClick={handleShowTranslation}
        >
          {currentAnswer || "Показать перевод"}
        </UiButton>
        <UiButton onClick={handleNextSentence}>Следующее предложение</UiButton>
        <UiButton onClick={handleReset}>Начать сначала</UiButton>
      </div>
    </div>
  );
}
