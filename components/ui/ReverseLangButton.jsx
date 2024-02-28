export default function ReverseLangButton({ onClick, isRusEng }) {
  return (
    <button
      className="flex bg-blue-500 focus:outline-none border-4 rounded-lg border-yellow-400 text-xl text-white px-1"
      onClick={() => onClick(!isRusEng)}
    >
      <span>{isRusEng ? "ru" : "en"}</span>
      <span className="relative top-[2px]">&#10132;</span>
      <span>{isRusEng ? "en" : "ru"}</span>
    </button>
  );
}
