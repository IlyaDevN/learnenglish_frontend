// components/CustomDropdown.jsx
import { useState, useRef, useEffect } from "react";

export default function CustomDropdown({ options, initialValue, onChange }) {
    const [selectedValue, setSelectedValue] = useState(
        initialValue || options[0]?.name
    );
	
    const detailsRef = useRef(null);

    useEffect(() => {
        if (initialValue !== undefined && initialValue !== selectedValue) {
            setSelectedValue(initialValue);
        }
    }, [initialValue, selectedValue]);

    const handleOptionClick = (event, option) => {
        event.preventDefault();
        event.stopPropagation();

        setSelectedValue(option.name);
        if (detailsRef.current) {
            detailsRef.current.open = false; // Закрываем details
        }

        if (onChange) {
            onChange(option);
        }
    };
	
    // Закрытие dropdown при клике вне его
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                detailsRef.current &&
                !detailsRef.current.contains(event.target)
            ) {
                detailsRef.current.open = false;
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <details ref={detailsRef} className="relative w-full font-sans">
            <summary className="flex justify-between items-center p-3.5 bg-stone-100 border-2 border-amber-800 rounded-lg cursor-pointer text-xl uppercase text-amber-800 font-bold outline-none list-none">
                <span className="flex-grow">{selectedValue}</span>
                <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1.41 0.589996L6 5.17L10.59 0.589996L12 2L6 8L0 2L1.41 0.589996Z"
                        fill="#694A04"
                    />
                </svg>
            </summary>
            <div className="uppercase absolute top-full left-0 right-0 bg-stone-100 border border-amber-800 border-t-0 rounded-b-lg shadow-md z-10 max-h-48 overflow-y-auto">
                {options?.map((option) => (
                    <div
                        key={option.value || option.id}
                        className={`p-2.5 cursor-pointer text-amber-800 text-xl
                        ${
                            option.name === selectedValue
                                ? "bg-amber-100 font-semibold"
                                : "hover:bg-stone-200"
                        }`}
                        onClick={(e) => handleOptionClick(e, option)}
                    >
                        {option.name}
                    </div>
                ))}
            </div>
        </details>
    );
}
