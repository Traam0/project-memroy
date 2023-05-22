import { IconX, TablerIconsProps } from "@tabler/icons-react";

interface PillProps {
	size: "sm" | "base" | "large";
	label: string;
	icon?: (props: TablerIconsProps) => JSX.Element;
}

export function Pill({
	size,
	label,
	icon: Icon = IconX,
}: PillProps): JSX.Element {
	switch (size) {
		case "sm":
			return (
				<div className="capitalize cursor-pointer font-semibold align-top flex items-center justify-center gap-1 text-vaporwave-purple-500 bg-vaporwave-pink-300 w-fit px-3 py-0.5 rounded-3xl">
					{label}{/*  <Icon size={16} /> */}
				</div>
			);
		case "large":
			return (
				<div className="capitalize cursor-pointer  font-semibold align-top flex items-center justify-center gap-1 text-vaporwave-purple-500 bg-vaporwave-pink-300 w-fit px-3 py-0.5 rounded-3xl">
					{label}{/*  <Icon size={16} /> */}
				</div>
			);
		default:
			return (
				<div className="capitalize cursor-pointer  font-semibold align-top flex items-center justify-center gap-1 text-vaporwave-purple-500 bg-vaporwave-pink-300 w-fit px-3 py-0.5 rounded-3xl">
					{label}{/*  <Icon size={16} /> */}
				</div>
			);
	}
}
