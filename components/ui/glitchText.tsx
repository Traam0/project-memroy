import { classNames } from "~/utils/classNames";

interface GlitchTextProps {
	className?: string;
	text: string;
	handleClick?: () => void;
}

export function GlitchText({
	className,
	text,
	handleClick,
}: GlitchTextProps): JSX.Element {
	return (
		<span
			className={classNames(className ? className : "", "glitch-text cursor-pointer ")}
			onClick={handleClick}
		>
			<span className="offsets" aria-hidden="true">
				{text}
			</span>
			{text}
			<span className="offsets" aria-hidden="true">
				{text}
			</span>
		</span>
	);
}
