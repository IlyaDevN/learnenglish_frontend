import { useState, useContext, useEffect } from "react";
import { INITIAL_LEVEL, LEVELS } from "../../../staticData/levels";
import { ContentContext } from "../../../context";
import CustomDropdown from "../customDropdown";

export default function LevelModeBlock() {
    const { currentLevel, setCurrentLevel } = useContext(ContentContext);

    function handleChange(option) {
        setCurrentLevel(option);
    }

    return (
        <div className="w-full">
            <p className="font-sans text-base text-amber-800">Уровень</p>
            <CustomDropdown
                initialValue={currentLevel.name}
                options={LEVELS}
                onChange={handleChange}
            />
        </div>
    );
}
