import { useLayoutEffect, useRef } from "react";

interface SakuraBloomProps {
	leafsCount: number;
	petalsCount: number;
}

export function SakuraBloom({
	leafsCount,
	petalsCount,
}: SakuraBloomProps): JSX.Element {
	const leafContainer = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		for (let i = 0; i < leafsCount; i++) {
			const leaf = document.createElement("div");
			leaf.classList.add("leaf");
			leaf.style.left = Math.random() * 100 + "%";
			leaf.style.top = Math.random() * 100 + "%";
			leaf.style.animationDelay = Math.random() * 8 + "s";
			leafContainer.current?.appendChild(leaf);
		}

		for (let i = 0; i < petalsCount; i++) {
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

	return (
		<div
			className="leaf-wrapper absolute inset-0  overflow-clip -z-[1]"
			ref={leafContainer}
		></div>
	);
}
