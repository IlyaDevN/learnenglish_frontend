import clsx from "clsx";

export default function Counter({ value, className, loading, bg }) {
    return (
        <div
            className={clsx(
                "flex justify-center items-center border-4 rounded-full border-yellow-400 text-xl text-yellow-900",
                loading ? "animate-ping" : "animate-none",
                bg ? bg : "bg-white",
                className,
            )}
        >
            {value}
        </div>
    );
}
