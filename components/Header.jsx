import clsx from "clsx";
import BurgerButton from "./ui/BurgerButton";
import ProfileButton from "./ui/profileButton/ProfileButton";
import { useContext } from "react";
import { ContentContext } from "../context";

export default function Header() {
  const { isModalActive, setIsModalActive } = useContext(ContentContext);

  function changeModalState() {
    setIsModalActive(!isModalActive);
  }

  return (
    <div
      className={clsx(
        "w-full h-14 px-4 py-3 bg-lime-500 bg-opacity-80 flex justify-between items-center",
      )}
    >
      <BurgerButton onClick={changeModalState}/>
      <ProfileButton />
    </div>
  );
}
