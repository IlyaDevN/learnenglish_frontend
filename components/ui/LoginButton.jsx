import { useRouter } from "next/router";
import clsx from "clsx";

export default function LoginButton() {
	const router = useRouter();

	function onClickHandler() {
		router.push("/login");
	}

	return (
		<button className={clsx("text-center mb-7 text-2xl font-black text-yellow-900 uppercase",
			router.asPath === "/login" && "opacity-50 pointer-events-none"
		)}
			onClick={onClickHandler}
		>
            вход
		</button>
	)
}