import { useState, useEffect, useContext } from "react";
import { INITIAL_DIRECTION, TRANSLATION_DIRECTIONS } from "../../../staticData/translation_directions";
import { ContentContext } from "../../../context";
import CustomDropdown from "../customDropdown";

export default function DirectionModeBlock() {
	const { isRusEng, setIsRusEng } = useContext(ContentContext);

    function handleChange(option) {
        setIsRusEng(option);
    }

    return (
        <div className="w-full">
            <p className="font-sans text-base text-amber-800">Направление перевода</p>
            <CustomDropdown
                initialValue={isRusEng.name}
                options={TRANSLATION_DIRECTIONS}
                onChange={handleChange}
            />
        </div>
    );
}
