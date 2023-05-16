import { Disclosure } from "@headlessui/react";
import { IconChevronDown } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GlitchText } from "~/components/ui";
import { classNames } from "~/utils/classNames";

export default function Guide() {
	const router = useRouter();
	useEffect(() => {
		const blob = document.getElementById("blob") as HTMLElement;
		if (blob) {
			document.body.onpointermove = (e) => {
				const { clientX, clientY } = e;
				blob.animate(
					{
						left: `${clientX}px`,
						top: `${clientY}px`,
					},
					{ duration: 3000, fill: "forwards" }
				);
			};
		}
	}, []);

	return (
		<main className="h-screen w-screen scrollbar-none bg-[#131313] overflow-x-hidden text-light overflow-y-scroll  relative guide">
			<div className="blob-overlayer fixed inset-0 blur-3xl ">
				<div
					id="blob"
					className="blob h-[350px] aspect-square absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-violet-400  to-red-300 blob-spin opacity-80"
				></div>
			</div>

			<header className="text-3xl w-full flex items-center justify-between px-2 md:px-12 py-8 relative before:content-[''] before:w-full before:absolute before:bg-gradient-to-r before:from-indigo-200 before:to-pink-300 before:inset-x-0 before:h-0.5 before:bottom-0">
				<div onClick={() => router.push("/")}>
					<GlitchText
						text="<memory />"
						className="hidden md:text-4xl md:block"
					/>
				</div>
				<h1 className="bg-gradient-to-r from-purple-200 to-pink-600 text-transparent bg-clip-text font-medium text-4xl tracking-wider cursor-pointer hover:animate-pulse">
					Guide.
				</h1>
			</header>
			<div className="mt-16 md:px-12 w-screen space-y-5 relative ">
				<div>
					<Disclosure defaultOpen>
						{({ open }) => (
							<>
								<Disclosure.Button
									className={classNames(
										"flex w-full justify-between rounded-lg bg-gradient-to-r from-purple-400 to-red-500 bg-clip-text text-transparent px-4 py-2 text-left text-xl  md:text-2xl font-medium tracking-wider  focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
										open ? "" : "border-b-pink-200 border-b"
									)}
								>
									<span> - What is Project Memory?</span>
									<IconChevronDown
										className={`${
											open ? "rotate-180 transform" : ""
										} h-5 w-5 text-purple-500`}
									/>
								</Disclosure.Button>
								<Disclosure.Panel className="px-6 pt-3 pb-3 text-light text-lg md:w-10/12 font-mono break-words">
									From the depths of my heart, I have created Project Memory.
									<br />
									It's an online application that holds a special place in my
									heart, designed to express my deepest feelings for You. This
									person has had an immeasurable impact on my life, and through
									this project, I want to immortalize our shared experiences and
									memories. <br /> <br /> The app allows me to capture and share
									those precious moments that we've shared together. Memories,
									represented as fragments, are created using dates, images, and
									text content that describe our time together. The central
									feature of the app is a scrollable feed, or "An Engram," which
									visually guides the user through our journey together,
									highlighting the love, joy, and connection that we've shared.{" "}
									<br /> <br /> One of the unique aspects of the app is the
									concept of memory decay. Over time, memories may begin to
									glitch and decay, representing the natural process of memories
									fading with the passage of time. This feature serves as a
									poignant reminder that while memories may fade, the emotions
									and experiences that we've shared will always remain a vital
									part of our lives. <br /> <br /> My ultimate goal with this
									project is to show YOU just how much they mean to me, and how
									deeply they've impacted my life. The memories contained within
									this app are a testament to the love, connection, and joy that
									we've shared together, and I hope that they will always serve
									as a reminder of our special bond.
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
				</div>

				<div>
					<Disclosure>
						{({ open }) => (
							<>
								<Disclosure.Button className="flex w-full justify-between rounded-lg bg-gradient-to-r from-purple-400 to-red-500 bg-clip-text text-transparent  px-4 py-2 text-left text-xl  md:text-2xl font-medium tracking-wider focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
									<span> - Project Memory and Fragment Decay !</span>
									<IconChevronDown
										className={`${
											open ? "rotate-180 transform" : ""
										} h-5 w-5 text-purple-500`}
									/>
								</Disclosure.Button>
								<Disclosure.Panel className="px-6 pt-3 pb-3 text-light text-lg md:w-10/12 font-mono break-words">
									Welcome to Project {"<Memory />"}. Here you will find the
									presence of a looming effect known as Memory Decay. It's
									origin although unknown, seems to mirror the unpredictable and
									enigmatic nature of forgetfulness. <br /> <br /> Memories
									progress through three stages: fresh, struggle, and failure.
									Over time, glitches appear and spread within a memory
									fragment, making it increasingly vulnerable to decay. The
									origin and nature of this process remains a perplexing enigma
									that defies explanation. <br /> <br /> It is embraced that no
									one possesses the knowledge to prevent the effect nor to study
									it. Therefore, one would be devoid of any device to assist
									scrutiny. As memories sail through time, anomalies referred to
									as glitches will corrupt the reminiscences, soon to weaken and
									vanish. Even the strongest of memories may fall victim to the
									unpredictable forces of memory decay.
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
				</div>

				<div>
					<Disclosure>
						{({ open }) => (
							<>
								<Disclosure.Button className="flex w-full justify-between rounded-lg bg-gradient-to-r from-purple-400 to-red-500 bg-clip-text text-transparent  px-4 py-2 text-left text-xl  md:text-2xl font-medium tracking-wider focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
									<span> - How can we Fight decay ?</span>
									<IconChevronDown
										className={`${
											open ? "rotate-180 transform" : ""
										} h-5 w-5 text-purple-500`}
									/>
								</Disclosure.Button>
								<Disclosure.Panel className="px-6 pt-3 pb-3 text-light text-lg md:w-10/12 font-mono break-words">
									Throughout Project {"<Memory />"}, the looming presence of
									Memory Decay is a constant reminder that memories are fleeting
									and fragile. Despite our best efforts to protect them, the
									natural process of decay is inevitable. Engram holders have
									always been in a defensive position in the battle against the
									loss of our memories. <br />
									<br />
									While we may never fully understand the origin or nature of
									the decay process, we have discovered that frequent
									interaction with a memory fragment can help slow down the
									inevitable decay. By revisiting and interacting with our
									shared experiences, we increase the chances of preserving
									their integrity and resisting the ravages of time. <br />
									However, the ultimate fate of these engrams remains uncertain,
									and the continued existence of our memories within the app is
									always at risk. We must take it upon ourselves, as engram
									owners, to safeguard our shared experiences, even as the
									shadow of oblivion threatens to engulf them. Despite the
									unpredictable forces of memory decay, the emotions and
									experiences we've shared will always hold a special place in
									our hearts.
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
				</div>
			</div>
		</main>
	);
}
