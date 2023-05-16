import Image from "next/image";
import { Inter } from "next/font/google";
import { Welcome } from "~/components";
import { AppLayout } from "~/Layouts/appLayout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<AppLayout>
			<Welcome />
		</AppLayout>
	);
}
