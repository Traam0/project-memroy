"use client";
import { TablerIconsProps } from "@tabler/icons-react";
import { classNames } from "~/utils/classNames";

interface CounterCardProps {
	variation: "default";
	title: string;
	count: number | string;
	className?: string;
	color?: string;
	icon: (props: TablerIconsProps) => JSX.Element;
}

export function CounterCard({
	variation,
	title,
	count,
	className,
	icon: Icon,
	color = "",
}: CounterCardProps): JSX.Element {
	if (variation === "default") {
		return (
			<div
				className={classNames(
					className ? className : "",
					"bg-[#232121] font-mono cursor-pointer  relative w-[268px] h-[206px] rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-md rounded-bl-md shadow-[#ffffff61] shadow-md  text-lg flex flex-col items-center justify-center overflow-hidden"
				)}
			>
				<p className="h-full  text-3xl flex flex-col justify-center items-center gap-4 hover:scale-110">
					<Icon size={46} />
					{count}
				</p>
				<h2 className="h-fit py-2 px-3 bg-gradient-to-r from-pinky to-purpureus w-full whitespace-pre-wrap">
					{title}
				</h2>
			</div>
		);
	}

	return <></>;
}
