import { useContext } from "react";
import { ContentContext } from "../context";
import { CSSTransition } from "react-transition-group";
import clsx from "clsx";

export default function ModalMenuSettings() {
  const { isModalSettingsActive, setIsModalSettingsActive } = useContext(ContentContext);

  

  return (
    <CSSTransition in={isModalSettingsActive} timeout={500}>
      <div
        className={clsx(
			isModalSettingsActive ? "translate-x-0" : "translate-x-full",
          "w-full h-full bg-lime-500 opacity-80 fixed top-14 left-0 transition-transform duration-500",
        )}
      >
        <ul className="relative w-52 top-12 m-auto flex flex-col items-center gap-5">
          {/* <li>
            <ModalMenuButton
              name="начальная страница"
              destination={MODAL_PATHS.startPage}
              onClick={modalMenuSettingsButtonHandler}
            />
          </li>
          <li>
            <ModalMenuButton
              name="перевод предложений с сервера"
              destination={MODAL_PATHS.serverSentencesMenu}
              onClick={modalMenuSettingsButtonHandler}
            />
          </li> */}
        </ul>
      </div>
    </CSSTransition>
  );
}
