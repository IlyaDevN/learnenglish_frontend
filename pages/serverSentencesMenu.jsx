import clsx from "clsx";
import { Source_Sans_3 } from "next/font/google";
import { UiButton } from "../components/ui/UiButton";
import { useRouter } from "next/router";
import { TASKS } from "../staticData";

const sourceSans3 = Source_Sans_3({
  subsets: ["latin", "cyrillic"],
  weight: ["900"],
});

export default function ServerSentencesMenu() {
  const router = useRouter();
  const TASKS_LIST = Object.keys(TASKS);

  function chooseTaskButtonHandler(value) {
	localStorage.setItem("currentTask", JSON.stringify(value));
    router.push("/serverSentences");
  }

  // function addSentencesButtonHandler() {
  // 	router.push("/addSentences");
  // }

  return (
    <div className="px-4">
      <div
        className={clsx(
          sourceSans3.className,
          "w-full max-w-4xl mx-auto bg-orange-100 border-4 border-s-gray-100 rounded-2xl px-3.5 py-8 bg-opacity-80",
        )}
      >
        <div className="flex flex-col items-center gap-5">
          <p className="text-2xl font-black text-yellow-900 uppercase">
            выберите задание
          </p>
          {TASKS_LIST.map((task, index) => (
            <UiButton
              key={index}
              className="w-full"
              onClick={() => chooseTaskButtonHandler(task)}
            >
              {task}
            </UiButton>
          ))}
        </div>
      </div>
    </div>
  );
}
