import { useContext } from "react";
import { LEVELS } from "../../../staticData/levels";
import { ContentContext } from "../../../context";
import CustomDropdown from "../customDropdown";

export default function LevelModeBlock() {
    const { currentLevel, setCurrentLevel } = useContext(ContentContext);

    function handleChange(option) {
        setCurrentLevel(option);
		// console.log("LevelModeBlock", option);
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
