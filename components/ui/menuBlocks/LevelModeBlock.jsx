import { useContext } from "react";
import { LEVELS } from "../../../staticData/levels";
import { ContentContext } from "../../../context";
import CustomDropdown from "../customDropdown";
import clsx from "clsx";
import { useRouter } from "next/router";

export default function LevelModeBlock({ setIsStarted, setResetTrigger}) {
    const { currentLevel, setCurrentLevel } = useContext(ContentContext);
	const router = useRouter();
	const currentPath = router.asPath;

    function handleChange(option) {
        setCurrentLevel(option);
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
            <p className="font-sans text-base text-amber-800">Уровень</p>
            <CustomDropdown
                initialValue={currentLevel.name}
                options={LEVELS}
                onChange={handleChange}
            />
        </div>
    );
}
