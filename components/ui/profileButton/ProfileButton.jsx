import Image from "next/image";
import profImgSrc from "./human_icon.svg";

export default function ProfileButton() {

	return (
		<button className="w-8 h-8">
			<Image className="" src={profImgSrc} alt="Аватар пользователя" priority={false}/>
		</button>
	)
}