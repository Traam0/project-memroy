import Image from "next/image";
import { useEffect, useRef } from "react";
import { AppLayout } from "~/Layouts/appLayout";
import { SakuraBloom } from "~/components";

export default function Special(): JSX.Element {
	const gallery = useRef<HTMLDivElement>(null);
	const colors: Array<string> = [
		"#300350",
		"#94167F",
		"#300350",
		"#94167F",
		"#F9AC53",
		"#94167F",
		"#F9AC53",
		"#F9AC53",
		"#94167F",
		"#153CB4",
		"#153CB4",
		"#153CB4",
	];

	useEffect(() => {
		window.onmousemove = (e) => {
			const mouseX = e.clientX,
				mouseY = e.clientY;

			const xDecimal = mouseX / window.innerWidth,
				yDecimal = mouseY / window.innerHeight;

			if (gallery.current) {
				const maxX = gallery.current.offsetWidth - window.innerWidth,
					maxY = gallery.current.offsetHeight - window.innerHeight;

				const panX = maxX * xDecimal * -1,
					panY = maxY * yDecimal * -1;

				gallery.current.animate(
					{
						transform: `translate(${panX}px, ${panY}px)`,
					},
					{
						duration: 7000,
						fill: "forwards",
						easing: "ease",
					}
				);
			}
		};
	}, []);

	return (
		<AppLayout>
			<div ref={gallery} className="w-[150vmax] h-[150vmax] absolute bg-dark ">
				<SakuraBloom leafsCount={50} petalsCount={75} />
				<Block
					imageURI="https://res.cloudinary.com/dqmh0oemg/image/upload/v1684527836/project-memory/specials/IMG_20230218_110859_dxvnnx.jpg"
					bg={
						colors[
							Math.round(Math.random())
								? Math.floor(Math.random() * colors.length)
								: Math.floor(Math.random() * colors.length)
						]
					}
					height="26%"
					width="25%"
					top="5%"
					left="5%"
				/>
				<Block
					imageURI="https://res.cloudinary.com/dqmh0oemg/image/upload/v1684527840/project-memory/specials/VID_20230131_180437_exported_31056_mbj3rp.jpg"
					bg={colors[Math.floor(Math.random() * colors.length)]}
					height="16%"
					width="12%"
					top="45%"
					left="20%"
				/>

				<Block
					imageURI="https://res.cloudinary.com/dqmh0oemg/image/upload/v1684527832/project-memory/specials/IMG_20230120_182633_izmecv.jpg"
					bg={colors[Math.floor(Math.random() * colors.length)]}
					height="16%"
					width="12%"
					top="57%"
					left="2%"
				/>

				<Block
					imageURI="https://res.cloudinary.com/dqmh0oemg/image/upload/v1684527839/project-memory/specials/original_1f8dfc77-7d02-4164-af59-315a6301b4db_Screenshot_2023-05-02-17-57-33-379_com.instagram.android_tlge3v.jpg"
					bg={colors[Math.floor(Math.random() * colors.length)]}
					height="20%"
					width="15%"
					left="60%"
					top="15%"
				/>

				<Block
					imageURI="https://res.cloudinary.com/dqmh0oemg/image/upload/v1684527838/project-memory/specials/IMG_20230227_135423_oxfdok.jpg"
					bg={colors[Math.floor(Math.random() * colors.length)]}
					height="30%"
					width="20%"
					left="50%"
					top="65%"
				/>

				<Block
					imageURI="https://res.cloudinary.com/dqmh0oemg/image/upload/v1684527839/project-memory/specials/IMG_20230131_174308_gns7ia.jpg"
					bg={colors[Math.floor(Math.random() * colors.length)]}
					height="20%"
					width="13%"
					left="80%"
					top="80%"
				/>
				<Block
					imageURI="https://res.cloudinary.com/dqmh0oemg/image/upload/v1684527832/project-memory/specials/IMG_20230104_130851_be0u3d.jpg"
					bg={colors[Math.floor(Math.random() * colors.length)]}
					height="20%"
					width="13%"
					left="5%"
					top="80%"
				/>

				<Block
					imageURI="https://res.cloudinary.com/dqmh0oemg/image/upload/v1684527840/project-memory/specials/VID_20230131_180437_exported_19119_iyjcks.jpg"
					bg={colors[Math.floor(Math.random() * colors.length)]}
					height="20%"
					width="13%"
					left="85%"
					top="8%"
				/>

				<Block
					imageURI="https://res.cloudinary.com/dqmh0oemg/image/upload/v1684527841/project-memory/specials/IMG_20230131_174428_toal03.jpg"
					bg={colors[Math.floor(Math.random() * colors.length)]}
					height="20%"
					width="13%"
					left="50%"
					top="40%"
				/>
			</div>
		</AppLayout>
	);
}

interface BlockProps {
	imageURI: string;
	bg: string;
	height?: string;
	width: string;
	top: string;
	left: string;
}

function Block({
	imageURI,
	bg,
	height,
	width,
	top,
	left,
}: BlockProps): JSX.Element {
	return (
		<div
			className="scale25 rounded-[1vmax] absolute transition-transform duration-700 ease-in-out hover:scale-[1.05] group cursor-pointer"
			style={{ backgroundColor: bg, height, width, top, left }}
		>
			<img
				src={imageURI}
				alt=""
				className="h-full w-full object-cover opacity-0 transition-opacity transition-transform duration-700 ease-in-out group-hover:opacity-100 group-hover "
				style={{ borderRadius: "inherit" }}
			></img>
		</div>
	);
}

// interface ClientData {
// 	inc: number;
// 	fname: string;
// 	lname: string;
// 	cin: string;
// 	phone: string;
// 	permitNo: string;
// }
// const clientData: Array<ClientData> = [];

// for (let i = 0; i < clientData.length; i += 3) {
// 	console.log(clientData[i].inc, " | ", clientData[i+1].inc, " | ",  clientData[i+2].inc, "\n")
// 	console.log(clientData[i].cin, " | ", clientData[i+1].cin, " | ",  clientData[i+2].cin, "\n")
// 	console.log(clientData[i].fname, " | ", clientData[i+1].fname, " | ",  clientData[i+2].fname, "\n")
// 	console.log(clientData[i].lname, " | ", clientData[i+1].lname, " | ",  clientData[i+2].lname, "\n")
// 	console.log(clientData[i].phone, " | ", clientData[i+1].phone, " | ",  clientData[i+2].phone, "\n")
// 	console.log(clientData[i].permitNo, " | ", clientData[i+1].permitNo, " | ",  clientData[i+2].phone, "\n")
// 	console.log("----------------------------------------------------------------------------------------\n")
// }
