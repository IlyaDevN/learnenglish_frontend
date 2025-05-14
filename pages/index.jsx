import clsx from "clsx";
import { useRouter } from "next/router";
import { Source_Sans_3 } from "next/font/google";
import { UiButton } from "../components/ui/UiButton";

const sourceSans3 = Source_Sans_3({
	subsets: ["latin", "cyrillic"],
	weight: ["700", "900"],
});

export default function HomePage() {
  const router = useRouter();

  function goTo() {
	router.push("/serverSentencesMenu");
  }

  return (
    <div className="px-4">
      <div
        className={clsx(
          sourceSans3.className,
          "w-full max-w-4xl mx-auto bg-orange-100 border-4 border-s-gray-100 rounded-2xl px-3.5 py-8 bg-opacity-80",
        )}
      >
		<h1 className="text-2xl font-black text-yellow-900 uppercase text-center">Добро пожаловать</h1>
      </div>
	  <UiButton
		className="block mt-8 mx-auto w-full max-w-4xl"
	    onClick={goTo}>Перевод предложений</UiButton>
    </div>
  );
}
