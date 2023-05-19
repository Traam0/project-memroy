import { useQuery } from "@tanstack/react-query";
import axios, { Axios, AxiosError } from "axios";
import { error } from "console";
import { useState } from "react";
import { DashBoardLayout } from "~/Layouts/dashBoardLayout";
import { useSession } from "~/hooks";
import { classNames } from "~/utils/classNames";

export default function DashBoard(): JSX.Element {
	const { data: session, ...sessionRest } = useSession();
	const dashboard = useQuery(
		["dashboard"],
		async function (): Promise<any> {
			return axios
				.get("/api/users/dashboard")
				.then((response) => response.data)
				.catch((error: AxiosError) => {});
		},
		{
			staleTime: 1000 * 60 * 10,
		}
	);

	return (
		<DashBoardLayout>
			<div className="w-full h-full py-10 px-6 ">
				<section
					role="banner"
					className="font-mono tracking-wide px-5 py-3  bg-[#242323] rounded-md shadow-purpureus shadow-sm text-lg"
				>
					Welcome back to Project Memory, where forgotten moments find solace
					and cherished memories are rekindled. Step into the realm of your
					past, where time bends and stories unfold. Embrace the power to
					resurrect fading fragments and celebrate the tapestry of your
					existence. <br /> Welcome back, and let the magic of remembrance guide
					your journey.
				</section>

				<Section title="Account Overview">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
					assumenda harum optio ducimus quaerat similique quos. Incidunt vero
					doloremque, quaerat dolor inventore ipsum architecto. Hic officia
					nesciunt debitis deserunt deleniti.
				</Section>
			</div>
		</DashBoardLayout>
	);
}

interface SectionProps {
	title: string;
	children: React.ReactNode;
	className?: string;
}

function Section({ className, title, children }: SectionProps): JSX.Element {
	return (
		<section
			role="none"
			className={classNames(
				className ? className : "",
				"w-full py-4 px-3 space-y-4"
			)}
		>
			<h1 className="text-3xl border-b border-b-purpureus pl-2 py-2 select-none">
				• {title}
			</h1>
			<div>{children}</div>
		</section>
	);
}
