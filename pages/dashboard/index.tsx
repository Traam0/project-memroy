import {
	IconDatabase,
	IconKey,
	IconLock,
	IconLockOpen,
	IconPhoto,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import axios, { Axios, AxiosError } from "axios";
import { error } from "console";
import { format, parseISO } from "date-fns";
import React, { useState } from "react";
import { DashBoardLayout } from "~/Layouts/dashBoardLayout";
import { Pill } from "~/components/ui";
import { TipTapEditor } from "~/components/ui/editors/tip-tap";
import { useSession } from "~/hooks";
import { classNames } from "~/utils/classNames";
import { pad } from "~/utils/helpers";
import { DashBoard } from "~/utils/types";

export default function DashBoard(): JSX.Element {
	const { data: session, ...sessionRest } = useSession();
	const { data: dashboard, ...dashboardRest } = useQuery(
		["dashboard"],
		async function (): Promise<DashBoard | undefined> {
			return axios
				.get("/api/users/dashboard")
				.then((response) => response.data)
				.catch((error: AxiosError) => {});
		},
		{
			staleTime: 1000 * 60 * 10,
		}
	);

	const [newFragment, setNewFragment] = useState<string>();

	return (
		<DashBoardLayout>
			<div className="w-full h-full py-10 px-6 pb-44">
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
					<div className="bg-vaporwave-purple-900/60 p-3 rounded-lg flex flex-wrap gap-8 justify-start ">
						<div className="bg-dark flex flex-col gap-1 justify-start items-start w-fit py-3 px-4 rounded-md min-w-[320px]">
							<div className="flex flex-col items-center">
								<IconDatabase
									size={40}
									className="text-vaporwave-pink-500 fill-vaporwave-pink-700/40"
								/>
							</div>
							<div className="py-2 flex flex-col cursor-pointer">
								<div className="flex gap-3">
									<h2 className="flex items-center gap-1">EngramID: </h2>{" "}
									{dashboard?.engram._id}
								</div>
								<div className="flex gap-3">
									<h2 className="flex items-center gap-1">Initialised : </h2>{" "}
									{dashboard &&
										format(
											parseISO(dashboard?.engram.createdAt as string),
											"dd-MMM-yy"
										)}
								</div>
								<div className="flex gap-3">
									<h2 className="flex items-center gap-1">Last update : </h2>{" "}
									{dashboard &&
										format(
											parseISO(dashboard?.engram.updatedAt as string),
											"dd-MMM-yy"
										)}
								</div>
								<div className="flex gap-3">
									<h2 className="flex items-center gap-1">
										{dashboard?.engram.public ? <IconLockOpen /> : <IconLock />}{" "}
										Privacy:{" "}
									</h2>{" "}
									{dashboard?.engram.public ? "public" : "private"}
								</div>
								<div className="flex gap-3">
									<h2 className="flex items-center gap-1">
										<IconKey /> Key:{" "}
									</h2>{" "}
									•••••••••• <span className="cursor-pointer">copy</span>
								</div>
								<div>{dashboard?.engram.description}</div>
							</div>
						</div>
						<span></span>
						<div className="bg-dark flex flex-col gap-1 justify-start items-start w-fit py-3 px-4 rounded-md w-[320px]">
							<div className="flex flex-col items-center">
								<IconPhoto
									size={40}
									className="text-vaporwave-pink-500 fill-vaporwave-pink-700/40"
								/>
							</div>

							<div className="py-2 flex flex-col gap-2 select-none h-full w-full ">
								{dashboard && dashboard?.gallery.images.length > 0 ? (
									<React.Fragment>
										<div className="flex gap-3">
											<h2 className="flex items-center gap-1">
												Exhibits count :{" "}
											</h2>{" "}
											{pad(dashboard.gallery.images.length)}
										</div>
										<div className="space-y-2">
											<div className="flex gap-3">
												<h2 className="flex items-center gap-1">
													Tags count :{" "}
												</h2>{" "}
												{pad(dashboard.gallery.tags.length)}
											</div>
											<div className="overflow-x-scroll scrollbar-none flex gap-2 items-center justify-start whitespace-nowrap">
												{dashboard.gallery.tags.map((category) => (
													<Pill label={category} size="base" />
												))}
											</div>
										</div>
										<div className="space-y-2">
											<div className="flex gap-3">
												<h2 className="flex items-center gap-1">
													Categories count :{" "}
												</h2>{" "}
												{pad(dashboard.gallery.categories.length)}
											</div>
											<div className="overflow-x-scroll scrollbar-none flex gap-2 items-center justify-start whitespace-nowrap">
												{dashboard.gallery.categories.map((category) => (
													<Pill label={category} size="base" />
												))}
											</div>
										</div>
										<div className="flex overflow-x-scroll scrollbar-none"></div>
									</React.Fragment>
								) : (
									<div className="h-full w-full flex items-center justify-center text-xl ">
										Empty
									</div>
								)}
							</div>
						</div>
					</div>
				</Section>

				<Section title="Fragment">
					<TipTapEditor callback={(html: string) => setNewFragment(html)} />
				</Section>
				<Section title="etst">
					<div dangerouslySetInnerHTML={{__html: newFragment as string}}></div>
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
			{children}
		</section>
	);
}
