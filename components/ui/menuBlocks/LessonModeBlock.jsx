import { useState, useContext, useEffect } from "react";
import { INITIAL_LEVEL, LEVELS } from "../../../staticData/levels";
import { ContentContext } from "../../../context";
import CustomDropdown from "../customDropdown";

export default function LessonModeBlock({ currentLessonList }) {
    const { currentLesson, setCurrentLesson } = useContext(ContentContext);

    function handleChange(option) {
        setCurrentLesson(option);
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
