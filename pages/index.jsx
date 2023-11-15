import Image from "next/image";
import bgSrc from "./bg.jpg";
import { Source_Sans_3 } from "next/font/google";
import clsx from "clsx";
import { UiButton } from "../components/ui/UiButton";
import { ContentField } from "../components/ui/ContentField";
import { InputField } from "../components/ui/InputField";
import { useEffect, useState, useRef } from "react";
import { db } from "../DB";

const sourceSans3 = Source_Sans_3({
  subsets: ["latin", "cyrillic"],
  weight: ["700", "900"],
});

export default function HomePage() {
  const [sentences, setSentences] = useState(db);
  const [randomNumber, setRandomNumber] = useState(() => getRandomNumber(0, sentences.length));
  const [currentAnswer, setCurrentAnswer] = useState();
  const count = useRef(sentences.length);

  function handleNextSentence() {
    const sentencesCopy = sentences.slice();
    sentencesCopy.splice(randomNumber, 1);
    setSentences(sentencesCopy);
	count.current -= 1;
    setRandomNumber(getRandomNumber(0, count.current));
  }

  function handleShowTranslation() {
    setCurrentAnswer(sentences[randomNumber].answer);
  }

  function handleReset() {
    setSentences(db);
  }

  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
  }

  return (
    <div className="px-4 py-7">
      <Image
        className="fixed left-0 top-0 w-screen h-full -z-10"
        src={bgSrc}
        alt="background"
      />
      <div
        className={clsx(
          sourceSans3.className,
          "w-full bg-orange-100 border-4 border-s-gray-100 rounded-2xl px-3.5 py-3.5 flex flex-col gap-4 bg-opacity-80",
        )}
      >
        <ContentField suppressHydrationWarning={false}>
          {sentences[randomNumber]
            ? sentences[randomNumber].question
            : "The end :)"}
        </ContentField>
        <ContentField>
          {currentAnswer || "Нажмите показать перевод"}
        </ContentField>
        <InputField />
        <UiButton onClick={handleShowTranslation}>Показать перевод</UiButton>
        <UiButton onClick={handleNextSentence}>Следующее предложение</UiButton>
        <UiButton onClick={handleReset}>Начать сначала</UiButton>
      </div>
    </div>
  );
}
