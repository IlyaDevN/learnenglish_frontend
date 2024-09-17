import clsx from "clsx";

export default function SelectLesson({ className, onChange, options, selectName }) {
	
  return (
    <div>
      <select
        className={clsx("bg-blue-500 focus:outline-none border-4 rounded-lg border-yellow-400 text-xl text-white", className)}
        name="lessons"
        onChange={(event) => onChange(event.target.value)}
        defaultValue=""
      >
        <option value="">
          {selectName}
        </option>
        {options?.map((option) => (
          <option key={option.id} value={option.address}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
