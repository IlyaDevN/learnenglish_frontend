import { useContext } from "react";
import { TRANSLATION_DIRECTIONS } from "../../../staticData/translation_directions";
import { ContentContext } from "../../../context";
import CustomDropdown from "../customDropdown";

export default function DirectionModeBlock() {
    const { translationDirection, setTranslationDirection } =
        useContext(ContentContext);

    function handleChange(option) {
        setTranslationDirection(option.value);
    }

    return (
        <div className="w-full">
            <p className="font-sans text-base text-amber-800">
                Направление перевода
            </p>
            <CustomDropdown
                initialValue={translationDirection.name}
                options={TRANSLATION_DIRECTIONS}
                onChange={handleChange}
            />
        </div>
    );
}
