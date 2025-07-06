// components/CustomDropdown.jsx
import { useState, useRef, useEffect, useContext } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { ContentContext } from "../../context";

export default function CustomDropdown({ options, initialValue, onChange, isLastLine = false }) {
	const router = useRouter();
	const currentPath = router.asPath;
	const { isMobile } = useContext(ContentContext);
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
            <summary className={clsx("flex justify-between items-center bg-stone-100 border-2 border-amber-800 rounded-lg cursor-pointer text-xl uppercase text-amber-800 font-bold outline-none list-none",
				currentPath === "/serverSentencesMenu" && isMobile && "p-1.5",
				currentPath === "/serverSentencesMenu" && !isMobile && "p-3.5",
				currentPath === "/serverSentences" &&  "p-1.5",
			)}>
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
            <div className={clsx("uppercase absolute top-full left-0 right-0 bg-stone-100 border border-amber-800 border-t-0 rounded-b-lg shadow-md z-10 max-h-48 overflow-y-auto", 
				isLastLine && !isMobile && "max-h-[7rem]",
				isLastLine && isMobile && "max-h-[7.5rem]"
			)}>
                {options?.map((option) => (
                    <div
                        key={option.value || option.id}
                        className={clsx("cursor-pointer text-amber-800 text-xl",
							currentPath === "/serverSentencesMenu" && isMobile && "p-1.5",
							currentPath === "/serverSentencesMenu" && !isMobile && "p-3.5",
							currentPath === "/serverSentences" &&  "p-1.5",
                            option.name === selectedValue
                                ? "bg-amber-100 font-semibold"
                                : "hover:bg-stone-200"
						)}
                        onClick={(e) => handleOptionClick(e, option)}
                    >
                        {option.name}
                    </div>
                ))}
            </div>
        </details>
    );
}
