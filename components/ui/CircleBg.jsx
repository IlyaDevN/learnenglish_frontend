import clsx from "clsx"

export default function CircleBg({ className }) {
	return (
		<div className={clsx("absolute z-10 w-3 h-3 rounded-full bg-radial-gradient-yellow from-gradient-yellow-from to-gradient-yellow-to", 
			className)}>	
		</div>
	)
}