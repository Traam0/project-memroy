import { IconLogin } from "@tabler/icons-react";
import { AppLayout } from "~/Layouts/appLayout";
import { SakuraBloom } from "~/components";
import { GlitchText } from "~/components/ui";
import { useForm, isEmail, matches } from "@mantine/form";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

export default function Login(): JSX.Element {
	const [globalError, setGlobalError] = useState<string>("");
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
				<span className="text-sm text-red-500 font-mono font-bold pl-3 whitespace-break-spaces max-w-[350px]">
					Password must be at least 8 characters long and include at least:{" "}
					<br /> 1 lowercase, <br /> 1 uppercase , <br /> 1 digit, and 1 special
					character.
				</span>
			),
		},
	});

	return (
		<AppLayout>
			<form
				onSubmit={formData.onSubmit(function () {
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
									toast.error(error.response.data.message, {
										position: "top-right",
									});
									setGlobalError("Email Address or password incorrect!");
									return;
								default:
									toast.error(error.response.data.message);
									setGlobalError("Oops, Somthing Went Wrong! :'(");
									return;
							}
						});
				})}
				className="w-full h-full flex justify-center items-center relative z-0"
			>
				<SakuraBloom leafsCount={25} petalsCount={32} />
				<div
					className="login py-12 px-10 bg-slate-600/30 text-light rounded-xl shadow-gray-500.shadow-md  backdrop-blur-sm min-w-[450px] min-h-[280px] flex flex-col items-center justify-start gap-5"
					style={{
						boxShadow:
							"0 0 .2rem #fff,0 0 .2rem #fff,0 0 0.3rem #6b7280,inset 0 0 .6rem #6b7280",
					}}
				>
					<GlitchText text="project <Memory/>" className="text-3xl mb-6" />
					{globalError && (
						<span className="text-base text-red-500 font-mono font-bold pl-3 whitespace-break-spaces">
							{globalError}
						</span>
					)}
					<div className="w-full flex flex-col items-start justify-center text-lg gap-2">
						<label htmlFor="email" className="text-xl tracking-wide">
							Email:
						</label>
						<input
							name="email"
							type="email"
							{...formData.getInputProps("email")}
							className="bg-slate-700/60 p-2 w-full rounded-md outline-none focus:outline focus:outline-purpureus font-thin "
						/>
						{formData.errors.email}
					</div>
					<div className="w-full flex flex-col items-start justify-center text-lg gap-2">
						<label htmlFor="password">Password:</label>
						<input
							name="password"
							type="password"
							{...formData.getInputProps("passowrd")}
							className="bg-slate-700/60 p-2 w-full rounded-md outline-none focus:outline focus:outline-purpureus font-thin "
						/>
						{formData.errors.passowrd}
					</div>

					<button
						type="submit"
						className="w-full flex gap-2 justify-center items-center text-base py-2 rounded-md ring-none border-2 border-purpureus hover:bg-purpureus/40 focus:bg-purpureus/40 focus:border-none focus:outline-2 focus:outline-offset-4 focus:outline-purpureus duration-150 ease-out"
					>
						<IconLogin />
						Login
					</button>
				</div>
			</form>
		</AppLayout>
	);
}
