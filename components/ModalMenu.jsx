import { useContext, useState, useEffect } from "react";
import { ContentContext } from "../context";
import ModalMenuButton from "./ui/ModalMenuButton";
import clsx from "clsx";
import { CSSTransition } from "react-transition-group";
import { useRouter } from "next/router";

export default function ModalMenu() {
  const { isModalActive, setIsModalActive, currentPage, setCurrentPage } = useContext(ContentContext);
  const [modalHeight, setModalHeight] = useState('100vh');

  const MODAL_PATHS = {
    startPage: "/",
    serverSentencesMenu: "/serverSentencesMenu",
	// ownSentencesMenu: "/ownSentencesMenu"
  };

  const router = useRouter();

    useEffect(() => {
    const calculateHeight = () => {
      const windowHeight = window.innerHeight;
      setModalHeight(`${windowHeight - 112}px`);
    };

    if (isModalActive) {
      calculateHeight();
    }
  }, [isModalActive]);

  function modalMenuButtonHandler(destination) {
    setIsModalActive(false);
    setCurrentPage(destination);
  }

  function modalTransitionEndHandler() {
	for(let key in MODAL_PATHS) {
		if(MODAL_PATHS[key] === currentPage) {
			router.push(currentPage);
		}
	}
  }

  return (
    <CSSTransition in={isModalActive} timeout={500} onExited={modalTransitionEndHandler}>
      <div
        className={clsx(
          isModalActive ? "translate-x-0" : "-translate-x-full",
          "w-full bg-green_80_mate absolute top-14 left-0 transition-transform duration-500"
        )}
		style={{ height: modalHeight }}
      >
        <ul className="relative w-52 top-12 m-auto flex flex-col items-center gap-5">
          <li>
            <ModalMenuButton
              name="начальная страница"
              destination={MODAL_PATHS.startPage}
              onClick={modalMenuButtonHandler}
            />
          </li>
          <li>
            <ModalMenuButton
              name="перевод предложений с сервера"
              destination={MODAL_PATHS.serverSentencesMenu}
              onClick={modalMenuButtonHandler}
            />
          </li>
		  {/* <li>
            <ModalMenuButton
              name="перевод собственных предложений"
              destination={MODAL_PATHS.ownSentencesMenu}
              onClick={modalMenuButtonHandler}
            />
          </li> */}
        </ul>
      </div>
    </CSSTransition>
  );
}
