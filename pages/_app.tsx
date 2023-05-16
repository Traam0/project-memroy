import "~/styles/globals.css";
import type { AppProps } from "next/app";
import { useRef } from "react";
import {
	Hydrate,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }: AppProps) {
	const querryClient = useRef(new QueryClient());

	return (
		<QueryClientProvider client={querryClient.current}>
			<Hydrate state={pageProps.dehydratedState}>
				<NextNProgress height={5} color="#5A189A" stopDelayMs={220} />
				<Component {...pageProps} />
			</Hydrate>
		</QueryClientProvider>
	);
}
