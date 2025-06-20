import { useRouter } from "next/router";
import clsx from "clsx";

export default function RegisterButton() {
	const router = useRouter();

	function onClickHandler() {
		router.push("/register");
	}

	return (
		<button className={clsx("text-center mb-7 text-2xl font-black text-yellow-900 uppercase",
			router.asPath === "/register" && "opacity-50 pointer-events-none",
		)}
			onClick={onClickHandler}
		>
            регистрация
		</button>
	)
}