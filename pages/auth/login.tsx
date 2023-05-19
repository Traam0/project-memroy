import { IconLogin } from "@tabler/icons-react";
import { AppLayout } from "~/Layouts/appLayout";
import { SakuraBloom } from "~/components";
import { GlitchText } from "~/components/ui";
import { useForm, isEmail, matches } from "@mantine/form";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useSession, useToggle } from "~/hooks";
import { useRouter } from "next/router";

export default function Login(): JSX.Element {
	const router = useRouter();
	const { data: session, ...sessionRest } = useSession();
	const [globalError, setGlobalError] = useState<string>("");
	const [attempting, toggleAttempting] = useToggle(false);
	const formData = useForm({
		initialValues: {
			email: "",
			passowrd: "",
		},
		validate: {
			email: isEmail(
				<span className="text-sm text-red-500 font-mono font-bold pl-3 whitespace-break-spaces">
					Invalid Email address.
				</span>
			),
			passowrd: matches(
				// /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,

				/^[A-Za-z\d@$!%*?&]{6,}$/,
				<span className="text-sm text-red-500 font-mono font-bold pl-3 whitespace-pre-wrap w-fit ">
					Strong Password!
				</span>
			),
		},
	});

	if (session && !sessionRest.isLoading) {
		router.replace("/", "/");
	}
	return (
		<AppLayout>
			<form
				onSubmit={formData.onSubmit(function () {
					toggleAttempting();
					if (!attempting) {
						axios
							.post<User>(
								"/api/auth/login",
								{
									email: formData.values.email,
									password: formData.values.passowrd,
								},
								{ withCredentials: true }
							)
							.then(({ status, data: res }) => {
								toast.success("Logged in successfully", {
									position: "top-right",
								});
								setGlobalError("");
								sessionRest.refetch();
							})
							.catch((error: AxiosError<{ message: string }>) => {
								if (!error.response) return;
								switch (error.response?.status) {
									case 401:
										toast.error(error.response.data.message, {
											position: "top-right",
										});
										setGlobalError("Email Address or password incorrect!");
										return;
									case 404:
										toast.error("Failed To Login", {
											position: "top-right",
										});
										setGlobalError("Email Address or password incorrect!");
										return;
									default:
										toast.error(error.response.data.message);
										setGlobalError("Oops, Somthing Went Wrong! :'(");
										return;
								}
							})
							.finally((): void | null => {
								return attempting ? null : toggleAttempting();
							});
					}
				})}
				className="w-full h-full flex justify-center items-center relative z-0"
			>
				<SakuraBloom leafsCount={25} petalsCount={32} />
				<div
					className="login py-12 px-10 bg-slate-600/30 text-light rounded-xl shadow-gray-500.shadow-md  backdrop-blur-sm min-w-[450px] min-h-[280px] flex flex-col items-center justify-start gap-5"
					style={{
						boxShadow:
							"0 0 .2rem #fff,0 0 .2rem #fff,0 0 0.3rem #9D44B5,inset 0 0 .6rem #9D44B5",
					}}
				>
					<GlitchText text="project <Memory/>" className="text-3xl mb-6" />
					{globalError && (
						<span className="text-base text-red-500 font-mono font-bold pl-3 whitespace-break-spaces">
							{globalError}
						</span>
					)}
					<div className="w-full flex flex-col gap-8">
						{/* <label htmlFor="email" className="text-xl tracking-wide">
							Email:
						</label> */}
						<div>
							<input
								name="email"
								type="email"
								{...formData.getInputProps("email")}
								placeholder="<\ Email>"
								className="bg-purple-400/40 p-2 w-full rounded-md text-white font-mono  text-lg outline-none focus:outline focus:outline-purpureus relative placeholder:absolute placeholder:right-6 placeholder:top-1/2 placeholder:-translate-y-1/2 placeholder:text-white placeholder:font-semibold text-dark/80 placeholder:opacity-60 placeholder:text-purple-100 "
							/>
							{formData.errors.email}
						</div>
						{/* <label htmlFor="password">Password:</label> */}

						<div>
							<input
								name="password"
								type="password"
								{...formData.getInputProps("passowrd")}
								placeholder="<\ Password>"
								className="bg-purple-400/40 p-2 w-full rounded-md text-white font-mono  text-lg outline-none focus:outline focus:outline-purpureus relative placeholder:absolute placeholder:right-6 placeholder:top-1/2 placeholder:-translate-y-1/2 placeholder:text-white placeholder:font-semibold text-dark/80 placeholder:opacity-60 placeholder:text-purple-100 "
							/>
							{formData.errors.passowrd} 
						</div>
					</div>

					<button
						type="submit"
						disabled={attempting}
						className="w-full flex gap-2 justify-center items-center text-base py-2 rounded-md ring-none border-2 border-purpureus hover:bg-purpureus/40 focus:bg-purpureus/40 focus:border-none focus:outline-2 focus:outline-offset-4 focus:outline-purpureus duration-150 ease-out"
					>
						{/* <IconLogin /> */}
						Login
					</button>
				</div>
			</form>
		</AppLayout>
	);
}
