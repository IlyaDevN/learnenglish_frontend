import clsx from "clsx";

export default function Counter({value, className}) {

	return (
		<div className={clsx("flex justify-center items-center bg-white border-4 rounded-full border-yellow-400 text-xl text-yellow-900",
			className
		)}>
			{value}
		</div>
	)
}