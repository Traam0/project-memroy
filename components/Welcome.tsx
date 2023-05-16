"use client";
import { useEffect, useState } from "react";
import { useToggle } from "~/hooks";
import { GlitchText } from "~/components/ui";
import { classNames } from "~/utils/classNames";
import { useRef, useLayoutEffect } from "react";


export function Welcome(): JSX.Element {
	const [navIsVisible, toggleNavIsVisible] = useToggle(false);
	const [count, setCount] = useState<number>(0);
	const leafContainer = useRef<HTMLDivElement>(null);
	useLayoutEffect(() => {
		for (let i = 0; i < 20; i++) {
			const leaf = document.createElement("div");
			leaf.classList.add("leaf");
			leaf.style.left = Math.random() * 100 + "%";
			leaf.style.top = Math.random() * 100 + "%";
			leaf.style.animationDelay = Math.random() * 8 + "s";
			leafContainer.current?.appendChild(leaf);
		}

		for (let i = 0; i < 30; i++) {
			const petal = document.createElement("div");
			petal.classList.add("sakura");
			petal.style.left = Math.random() * 100 + "%";
			petal.style.top = Math.random() * 100 + "%";
			petal.style.animationDelay = Math.random() * 8 + "s";
			leafContainer.current?.appendChild(petal);
		}

		return () => {
			leafContainer.current ? (leafContainer.current.innerHTML = "") : null;
		};
	}, []);

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

	return (
		<header className="relative w-full h-full flex flex-col justify-center items-center gap-8 py-6 z-0">
			<div
				className="leaf-wrapper absolute inset-0  overflow-clip -z-[1]"
				ref={leafContainer}
			></div>
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
