export default function ModalMenuButton({ name, destination, onClick }) {
  return (
    <button
      className="text-xl text-white font-black leading-tight uppercase text-center"
      onClick={() => onClick(destination)}
    >
      {name}
    </button>
  );
}
