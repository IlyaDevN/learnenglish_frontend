export default function SelectLesson({ onChange, options }) {
  return (
    <div>
      <select
        className="bg-blue-500 focus:outline-none border-4 rounded-lg border-yellow-400 text-xl text-white"
        name="lessons"
        onChange={(event) => onChange(event.target.value)}
        defaultValue=""
      >
        <option disabled value="">
          Выберите урок
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
