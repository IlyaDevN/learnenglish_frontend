import { useState } from "react";
import InputField from "./InputField";
import ShowPassButton from "./showPassButton/showPassButton";

export default function InputBlock({ tip, fieldName, fieldType, placeholder }) {
  const [currentFieldType, setCurrentFieldType] = useState("password");

  return (
    <div>
      <p className="uppercase mb-1 ml-1 text-yellow-900 font-bold leading-tight">
        {tip}
      </p>
      <div className="relative">
        <InputField 
			fieldName={fieldName}
			{...(fieldType === "password" ? {fieldType: currentFieldType} : {fieldType: fieldType})}
			placeholder={placeholder} />
        {fieldType === "password" && <ShowPassButton
			currentFieldType={currentFieldType}
		 	setCurrentFieldType={setCurrentFieldType}
		 />}
      </div>
    </div>
  );
}
