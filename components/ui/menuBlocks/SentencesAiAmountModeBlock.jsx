import { useContext } from "react";
import { ContentContext } from "../../../context";
import CustomDropdown from "../customDropdown";
import clsx from "clsx";
import { useRouter } from "next/router";
import { AMOUNT_OF_SENTENCES_TO_GENERATE } from "../../../staticData/amountOfSentencesToGenerate";

export default function SentencesAiAmountModeBlock() {
	const { amountOfGeneratedSentences, setAmountOfGeneratedSentences,  } = useContext(ContentContext);
	const router = useRouter();
	const currentPath = router.asPath;

	function handleChange(option) {
		setAmountOfGeneratedSentences(option);
	}

	return (
		<div className={clsx(
			currentPath === "/serverSentences"
			? "w-32"
			: "w-full"
		)}>
			<p className="font-sans text-base text-amber-800">Количество предложений</p>
			<CustomDropdown
				initialValue={amountOfGeneratedSentences.name}
				options={AMOUNT_OF_SENTENCES_TO_GENERATE}
				onChange={handleChange}

			/>
		</div>
	);
}
