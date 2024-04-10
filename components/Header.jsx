import clsx from "clsx";
import BurgerButton from "./ui/BurgerButton";
import ProfileButton from "./ui/profileButton/ProfileButton";
import { useContext } from "react";
import { ContentContext } from "../context";
import { useRouter } from "next/router";
import { MoveBackButton } from "./ui/movaBackButton";

export default function Header() {
  const { isModalActive, setIsModalActive } = useContext(ContentContext);
  const router = useRouter();

  function changeModalState() {
    setIsModalActive(!isModalActive);
  }

  function moveBack() {
    if (router.asPath === "/serverSentencesMenu") {
      router.push("/");
    }
    if (router.asPath === "/serverSentences") {
      router.push("/serverSentencesMenu");
    }
  }

  return (
    <div
      className={clsx(
        "w-full h-14 px-4 py-3 bg-lime-500 bg-opacity-80 flex justify-between items-center",
      )}
    >
      <BurgerButton onClick={changeModalState} />
      {router.asPath != "/" && (
        <MoveBackButton onClick={moveBack}>предыдущее меню</MoveBackButton>
      )}
      <ProfileButton />
    </div>
  );
}
