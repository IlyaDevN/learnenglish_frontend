import { useContext } from "react";
import { ContentContext } from "../../../context";
import CustomDropdown from "../customDropdown";
import clsx from "clsx";
import { useRouter } from "next/router";

export default function LessonModeBlock({ classNameOuter }) {
    const { currentLesson, setCurrentLesson, currentLessonList } = useContext(ContentContext);
	const router = useRouter();
	const currentPath = router.asPath;

    function handleChange(option) {
        setCurrentLesson(option);
    }

    return (
        <div className={clsx(
			currentPath === "/serverSentences"
			? "w-32"
			: "w-full"
		)}>
            <p className="font-sans text-base text-amber-800">Урок</p>
            <CustomDropdown
				initialValue={currentLesson?.name}
				options={currentLessonList}
				onChange={handleChange}

			/>
        </div>
    );
}
