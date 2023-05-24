import axios, { Axios, AxiosError } from "axios";
import { useState } from "react";
import { StatusCodes } from "http-status-codes";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { format, parseISO } from "date-fns";
import { toast } from "react-hot-toast";
import { pad } from "~/utils/helpers";
import { useSession, useToggle } from "~/hooks";
import { convertToBase64 } from "~/utils";
import { classNames } from "~/utils/classNames";
import { DashBoard, Exhibit } from "~/utils/types";
import { Pill } from "~/components/ui";
import { DashBoardLayout } from "~/Layouts/dashBoardLayout";
import { TipTapEditor } from "~/components/ui/editors/tip-tap";
import {
	IconClearAll,
	IconDatabase,
	IconLock,
	IconLockOpen,
	IconPhoto,
	IconX,
} from "@tabler/icons-react";
import { FileUploader } from "react-drag-drop-files";
import { SelectWithSearch } from "~/components/ui/forms";

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
	const [file, setFile] = useState<File>();
	const [fileUploading, toggleFileUploading] = useToggle(false);

	async function uploadExhibit(file: File): Promise<void> {
		toggleFileUploading();
		const encoded = await convertToBase64(file);
		axios
			.post<Exhibit>(
				"/api/gallery/addExhibit",
				{ imageEncoded: encoded },
				{ withCredentials: true }
			)
			.then(({ status, data: res }) => {
				toast.success("Item Added to gallery with success");
			})
			.catch((error: AxiosError<{ message: string }>) => {
				switch (error.response?.status) {
					case StatusCodes.UNAUTHORIZED:
						toast.error(error.response.data.message);
					case StatusCodes.BAD_SESSION:
						toast.error(error.response.data.message);
						sessionRest.refetch();
					default:
						return toast.error("Oops Something Went Wrong :(");
				}
			})
			.finally(toggleFileUploading);
	}

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
							<div className="py-2 flex flex-col gap-1 cursor-pointer">
								<div className="flex gap-3">
									<h2 className="flex items-center gap-1">EngramID: </h2>{" "}
									{dashboard?.engram?._id}
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
								{/* <div className="flex gap-3">
									<h2 className="flex items-center gap-1">
										<IconKey /> Key:{" "}
									</h2>{" "}
									•••••••••• <span className="cursor-pointer">copy</span>
								</div> */}
								<div>
									<h3>description:</h3>
									<p className="pl-2">{dashboard?.engram.description}</p>
								</div>
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
									<>
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
												{dashboard.gallery.tags.map((tag) => (
													<Pill label={tag} size="base" />
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
									</>
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
					<p>
						Fragments are the building blocks of memories within Project Memory.
						They encapsulate the essence of a moment, preserving it for
						eternity. Now, it's your turn to create your own fragment. Share a
						cherished memory, a heartfelt experience, or a joyful event that
						holds a special place in your heart. Add dates, images, and a
						personal touch to bring your fragment to life. Let your memories
						shine and be a source of inspiration for others. <br /> Start
						crafting your unique fragment now and let the magic of reminiscence
						unfold.
					</p>
					<h2>TBC</h2>
					<TipTapEditor callback={(html: string) => setNewFragment(html)} />
				</Section>

				<Section title="test">
					<div
						dangerouslySetInnerHTML={{ __html: newFragment as string }}
					></div>
				</Section>

				<Section title="Gallery">
					<div
						className="bg-vaporwave-pink-900/60 p-3 rounded-lg flex  gap-8 justify-start"
						id="gal"
					>
						<form className="w-[400px]">
							<FileUploader
								handleChange={(file: File) => setFile(file)}
								name="file"
								types={["JPG", "PNG", "GIF"]}
							/>
							<div>
								<SelectWithSearch
									label="Category"
									onChange={() => {}}
									selected=""
									value=""
									options={[...(dashboard?.gallery.categories ?? [])]}
								/>
							</div>
							<div>tags</div>
							<motion.button
								type="reset"
								className="flex items-center upper text-lg bg-vaporwave-yellow-500 rounded-md px-3 py-1 text-vaporwave-blue-500"
								onClick={() => console.log(file)}
							>
								<IconClearAll />
								clear
							</motion.button>
						</form>

						{/* <div className="relative w-full max-h-[600px]">
							{file && (
								<IconX
									onClick={() => setFile(undefined)}
									className="absolute top-2 right-2 bg-vaporwave-pink-500/90 text-vaporwave-purple-600 rounded-sm cursor-pointer"
								/>
							)}
							<img
								src={file && URL.createObjectURL(file)}
								alt={file?.name ?? 'no image selected'}
								height={400}
								className="w-full h-full object-cover"
							/>
						</div> */}
					</div>
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
