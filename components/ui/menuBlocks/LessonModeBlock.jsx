import { useContext } from "react";
import { ContentContext } from "../../../context";
import CustomDropdown from "../customDropdown";

export default function LessonModeBlock() {
    const { currentLesson, setCurrentLesson, currentLessonList } = useContext(ContentContext);
	//console.log("LessonModeBlock currentLessonList", currentLessonList);
	//console.log("LessonModeBlock currentLesson", currentLesson);

    function handleChange(option) {
        setCurrentLesson(option);
		//console.log("LessonModeBlock handleChange setCurrentLesson option", option);
    }

    return (
        <div className="w-full">
            <p className="font-sans text-base text-amber-800">Урок</p>
            <CustomDropdown
				initialValue={currentLesson?.name}
				options={currentLessonList}
				onChange={handleChange}
			/>
        </div>
    );
}
