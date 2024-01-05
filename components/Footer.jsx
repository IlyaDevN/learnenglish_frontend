import clsx from "clsx";

export default function Footer() {
  return (
    <footer
      className={clsx(
        "fixed bottom-0 w-full h-14 px-4 py-3 bg-lime-500 bg-opacity-80 flex justify-between items-center",
      )}
    ></footer>
  );
}
