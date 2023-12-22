import { useContext, useState } from "react";
import { ContentContext } from "../context";
import ModalMenuButton from "./ui/ModalMenuButton";
import clsx from "clsx";
import { CSSTransition } from "react-transition-group";
import { useRouter } from "next/navigation";

export default function ModalMenu() {
  const { isModalActive, setIsModalActive } = useContext(ContentContext);
  const [currentPage, setCurrentPage] = useState("/");
  const router = useRouter();

  function changePage(destination) {
	setIsModalActive(false);
	setCurrentPage(destination);
  }

  return (
    <CSSTransition
      in={isModalActive}
      timeout={500}
      onExited={() => router.push(currentPage)}
    >
      <div
        className={clsx(
          isModalActive ? "translate-x-0" : "-translate-x-full",
          "w-full h-full bg-lime-500 opacity-80 absolute top-14 left-0 transition-transform duration-500",
        )}
      >
        <ul className="relative w-52 top-12 m-auto flex flex-col items-center gap-5">
          <li>
            <ModalMenuButton
              name="начальная страница"
              destination="/"
              onClick={changePage}
            />
          </li>
          <li>
            <ModalMenuButton
              name="перевод предложений"
              destination="/menu"
              onClick={changePage}
            />
          </li>
        </ul>
      </div>
    </CSSTransition>
  );
}
