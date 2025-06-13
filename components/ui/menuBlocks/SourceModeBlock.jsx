import { useContext } from "react";
import { SOURCE_OF_SENTENCES } from "../../../staticData/source_of_sentences";
import { ContentContext } from "../../../context";
import CustomDropdown from "../customDropdown";
import clsx from "clsx";
import { useRouter } from "next/router";

export default function SourceModeBlock({ setIsStarted, setResetTrigger}) {
	const { currentSource, setCurrentSource } = useContext(ContentContext);
	const router = useRouter();
	const currentPath = router.asPath;

	function handleChange(option) {
		setCurrentSource(option);
		if(currentPath === "/serverSentences") {
			setIsStarted(false);
			setResetTrigger((oldValue)=> !oldValue)
		}
	}

	return (
		<div className={clsx(
			currentPath === "/serverSentences"
			? "w-32"
			: "w-full"
		)}>
			<p className="font-sans text-base text-amber-800">Источник предложений</p>
			<CustomDropdown
				initialValue={currentSource.name}
				options={SOURCE_OF_SENTENCES}
				onChange={handleChange}
			/>
		</div>
	);
}