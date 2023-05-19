"use client";
import { useEffect, useState } from "react";
import { useToggle } from "~/hooks";
import { GlitchText } from "~/components/ui";
import { classNames } from "~/utils/classNames";
import { useRef, useLayoutEffect } from "react";
import { SakuraBloom } from "./sakuraBloom";
import { useRouter } from "next/router";

export function Welcome(): JSX.Element {
	const [navIsVisible, toggleNavIsVisible] = useToggle(false);
	const [count, setCount] = useState<number>(0);
	const router = useRouter();

	useEffect(() => {
		if (count === 8) {
			toggleNavIsVisible();
			setTimeout(() => {
				setCount(0);
			}, 200);
		}

		const easterTimer = setTimeout(() => {
			setCount(0);
		}, 350);

		return () => {
			clearTimeout(easterTimer);
		};
	}, [count]);

	if (count === 8) {
		router.push("/gallery/special");
	}

	return (
		<header className="relative w-full h-full flex flex-col justify-center items-center gap-8 py-6 z-0">
			<SakuraBloom leafsCount={20} petalsCount={30} />
			<h1 className="text-xl md:text-5xl flex gap-3 items-baseline justify-center cursor-pointer select-none ">
				<span className="font-semibold tracking-wider">Project</span>
				<GlitchText
					className={classNames(
						"text-3xl md:text-7xl cursor-pointer  duration-200 ease-in-out",
						count === 8 ? "scale-125" : ""
					)}
					text="<Memory /> "
					handleClick={() => setCount((prev) => prev + 1)}
				/>
			</h1>
			<div className="typing text-lg md:text-3xl font-normal scrollbar-none max-w-full cursor-pointer">
				A project inspired by: You ^^.;
			</div>
		</header>
	);
}
