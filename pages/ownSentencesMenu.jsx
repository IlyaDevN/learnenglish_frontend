import { UiButton } from "../components/ui/UiButton";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ContentContext } from "../context";

export default function OwnSentencesMenu() {
	const { setCurrentPage } = useContext(ContentContext);
	const router = useRouter();

	function ownSentetencesTranslationButtonHandler() {
		setCurrentPage("/ownSentences");
		router.push("/ownSentences");
	}

	function addSentencesButtonHandler() {
		setCurrentPage("/addOwnSentences");
		router.push("/addOwnSentences");
	}

	function editOwnSentencesButtonHandler() {
		setCurrentPage("/editOwnSentences");
		router.push("/editOwnSentences");
	}

  return (
   <div className="px-4 py-7">
   	 <div className="w-full bg-orange-100 border-4 border-s-gray-100 rounded-2xl px-3.5 py-8 bg-opacity-80">
			<div className="flex flex-col items-center gap-5">
				<p className="text-2xl font-black text-yellow-900 uppercase">выберите задание</p>
				<UiButton className="w-full" onClick={ownSentetencesTranslationButtonHandler}>Перевод своих предложений</UiButton>
				<UiButton className="w-full" onClick={addSentencesButtonHandler}>Создать свои предложения</UiButton>
				<UiButton className="w-full" onClick={editOwnSentencesButtonHandler}>Редактировать предложения</UiButton>
			</div>
		</div>
   </div>
  );
}
