import clsx from "clsx";
import { Source_Sans_3 } from "next/font/google";
import { UiButton } from "../components/ui/UiButton";
import { InputSentenceField } from "../components/ui/InputSentenceField";
import { ContentContext } from "../context";
import { useContext, useRef, useState } from "react";
import { Cookies } from "react-cookie";

const sourceSans3 = Source_Sans_3({
  subsets: ["latin", "cyrillic"],
  weight: ["700", "900"],
});

export default function AddSentences() {
//   const { currentUser, setCurrentUser } = useContext(ContentContext);
  const [sentence, setSentence] = useState();
  const [translation, setTranslation] = useState();
  const isFirstTime = useRef(true);

//   console.log(currentUser);
  console.log(isFirstTime.current);

  async function sendSentence() {
	const cookies = new Cookies();
	const currentUser = cookies.get("user");

    const data = {
      currentUser: currentUser,
      sentence: sentence,
      translation: translation,
    };

    if (isFirstTime.current) {
      const response = await fetch("http://englishback.ua/dbCreation.php", {
        method: "post",
        header: { "Content-type": "application/json" },
        body: JSON.stringify(data.currentUser),
      });
      isFirstTime.current = false;
    }

    const response = await fetch("http://englishback.ua/addSentences.php", {
      method: "post",
      header: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });

	if(response.status === 201) {
		alert("Sentence created");
		setSentence("");
		setTranslation("");
	}
  }

  return (
    <div className="px-4 py-7">
      <div
        className={clsx(
          sourceSans3.className,
          "w-full bg-orange-100 border-4 border-s-gray-100 rounded-2xl px-3.5 py-8 bg-opacity-80",
        )}
      >
        <div className="flex flex-col items-center gap-5">
          <p className="text-center text-2xl font-black text-yellow-900 uppercase">
            Добавьте предложение
          </p>
          <InputSentenceField
            className="min-w-full"
            placeholder="Введите предложение"
            rows={4}
			value={sentence}
            onChange={(e) => setSentence(e.target.value)}
          />
          <InputSentenceField
            className="min-w-full"
            placeholder="Введите перевод"
            rows={4}
			value={translation}
            onChange={(e) => setTranslation(e.target.value)}
          />
          <UiButton className="w-full" onClick={sendSentence}>
            добавить
          </UiButton>
        </div>
      </div>
    </div>
  );
}
