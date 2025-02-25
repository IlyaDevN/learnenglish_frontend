import Image from "next/image";
import bgSrc from "./bg.jpg";
// import { ContentContext } from "../../context";
// import { useContext } from "react";
import Header from "../Header";
import ModalMenu from "../ModalMenu";
import ModalMenuSettings from "../ModalMenuSettings";
import Footer from "../Footer";

export default function Layout({ children }) {
//   const { isAuth } = useContext(ContentContext);

  return (
    <div className="h-screen flex flex-col">
      <Image
        className="fixed left-0 top-0 w-screen h-full -z-10"
        src={bgSrc}
        alt="background"
      />
	  {/* {isAuth && <Header/>} */}
	  <Header/>
	  <main className="py-20">
	  {children}
	  </main>
	  <ModalMenu />
	  <ModalMenuSettings />
	  {/* {isAuth && <Footer/>} */}
	  <Footer/>
    </div>
  );
}