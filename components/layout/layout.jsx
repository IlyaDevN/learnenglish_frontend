import Image from "next/image";
import bgSrc from "./bg.jpg";
import { ContentContext } from "../../context";
import { useContext } from "react";
import Header from "../Header";
import ModalMenu from "../ModalMenu";
import ModalMenuSettings from "../ModalMenuSettings";
import Footer from "../Footer";
import clsx from "clsx";

export default function Layout({ children }) {
  const { isMobile } = useContext(ContentContext);

  return (
    <div className="h-screen flex flex-col">
      <Image
        className="fixed left-0 top-0 w-screen h-full -z-10"
        src={bgSrc}
        alt="background"
      />
	  <Header/>
	  <main className={clsx("w-full",
		isMobile
		? "mt-[72px]"
		: "mt-20"
	  )}>
	  {children}
	  </main>
	  <ModalMenu />
	  <ModalMenuSettings />
	  <Footer/>
    </div>
  );
}