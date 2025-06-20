import { useContext, useState, useEffect } from "react";
import { ContentContext } from "../context";
import { CSSTransition } from "react-transition-group";
import clsx from "clsx";

export default function ModalMenuSettings() {
  const { isModalSettingsActive } = useContext(ContentContext);
  const [modalHeight, setModalHeight] = useState('100vh');

  useEffect(() => {
	  const calculateHeight = () => {
		const windowHeight = window.innerHeight;
		setModalHeight(`${windowHeight - 112}px`);
	  };
  
	  if (isModalSettingsActive) {
		calculateHeight();
	  }
	}, [isModalSettingsActive]);

  return (
    <CSSTransition in={isModalSettingsActive} timeout={500}>
      <div
        className={clsx(
			isModalSettingsActive ? "translate-x-0" : "translate-x-full",
          "w-full h-full bg-green_80_mate fixed top-14 left-0 transition-transform duration-500"
        )}
		style={{ height: modalHeight }}
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
