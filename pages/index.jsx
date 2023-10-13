import Image from "next/image";
import bgSrc from "./bg.jpg";
import { Source_Sans_3 } from "next/font/google";
import clsx from "clsx";
import { UiButton } from "../components/ui/UiButton";
import { ContentField } from "../components/ui/ContentField";
import { InputField } from "../components/ui/InputField";
import { useEffect, useState } from "react";
import { db } from "../DB";

const sourceSans3 = Source_Sans_3({ subsets: ["latin", "cyrillic"] });

export default function HomePage() {
  console.log("render");
  const [sentences, setSentences] = useState(db);
  const [randomNumber, setRandomNumber] = useState();
  const [currentAnswer, setCurrentAnswer] = useState();

  useEffect(() => {
    setRandomNumber(getRandomNumber(0, sentences.length));
    setCurrentAnswer("");
  }, [sentences]);

  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
  }

  function handleNextSentence() {
    if (sentences.length === 0) {
      return;
    }
    const sentencesCopy = sentences.slice();
    sentencesCopy.splice(randomNumber, 1);
    setSentences(sentencesCopy);
  }

  function handleShowTranslation() {
    setCurrentAnswer(sentences[randomNumber].answer);
  }

  function handleReset() {
    setSentences(db);
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
        <ContentField>
          {sentences[randomNumber]?.question ?? "The end"}
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
