import clsx from "clsx";
import { Source_Sans_3 } from "next/font/google";
import { UiButton } from "../components/ui/UiButton";
import { ContentField } from "../components/ui/ContentField";
import { InputSentenceField } from "../components/ui/InputSentenceField";
import { useState, useRef, useEffect } from "react";

const sourceSans3 = Source_Sans_3({
  subsets: ["latin", "cyrillic"],
  weight: ["700", "900"],
});

export default function SentencesTranslation() {
  const [initialData, setInitialData] = useState();
  const [sentences, setSentences] = useState([]);
  const [randomNumber, setRandomNumber] = useState();
  const [currentAnswer, setCurrentAnswer] = useState();
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [inputContent, setInputContent] = useState("");
  const count = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://ilyadevn.github.io/JsonApi/data.json",
      );
      const data = await response.json();
      setInitialData(data.db);
      setSentences([...sentences, ...data.db]);
      setRandomNumber(getRandomNumber(0, data.db.length));
      count.current = data.db.length;
      setIsDataLoading(true);
    };

    fetchData();
  }, []);

  function handleNextSentence() {
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
  }

  function handleShowTranslation() {
    if (sentences.length) {
      setCurrentAnswer(sentences[randomNumber].answer);
    } else {
      setCurrentAnswer("Урок окончен");
    }
  }

  function handleReset() {
    setSentences(initialData);
    count.current = initialData.length;
    setRandomNumber(getRandomNumber(0, count.current));
    setCurrentAnswer("");
	setInputContent("");
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
        <ContentField>
          {isDataLoading &&
            (sentences.length
              ? sentences[randomNumber].question
              : "The lesson is over")}
        </ContentField>
        <ContentField className={currentAnswer ? "" : "text-opacity-50"}>
          {currentAnswer || "Нажмите на кнопку показать перевод"}
        </ContentField>
        <InputSentenceField value={inputContent} onChange={e => setInputContent(e.target.value)}/>
        <UiButton onClick={handleShowTranslation}>Показать перевод</UiButton>
        <UiButton onClick={handleNextSentence}>Следующее предложение</UiButton>
        <UiButton onClick={handleReset}>Начать сначала</UiButton>
      </div>
    </div>
  );
}
