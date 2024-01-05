export default function SelectLesson({ onChange }) {
  return (
    <div>
      <select
        className="bg-blue-500 focus:outline-none border-4 rounded-lg border-yellow-400 text-xl text-white"
        name="lessons"
        onChange={event => onChange(event.target.value)}
		defaultValue=""
      >
        <option disabled value="">
          Выберите урок
        </option>
        <option value="1">Урок 1</option>
        <option value="2">Урок 2</option>
      </select>
    </div>
  );
}
