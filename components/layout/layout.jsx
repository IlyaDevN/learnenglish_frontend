import Image from "next/image";
import bgSrc from "./bg.jpg";

export default function Layout({children}) {
  return (
    <div>
      <Image
        className="fixed left-0 top-0 w-screen h-full -z-10"
        src={bgSrc}
        alt="background"
      />
	  {children}
    </div>
  );
}