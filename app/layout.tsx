import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/components/ui/globals.css";
import Header from "@/components/header/header";

export const metadata: Metadata = {
	title: "Scouting",
	description:
		"The Zebracorn's scouting system for First Robotics Competitions.",
};

export const roboto = Roboto({ weight: ['300'], subsets: ['latin'] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
    <body className={`${roboto.className} antialiased flex flex-col h-screen overflow-auto bg-zinc-900 p-6 text-md`}>
				<div className="w-full flex-none">
					<Header />
				</div>
				<div className="flex-grow w-max mx-auto mt-10">{children}</div>
			</body>
		</html>
	);
}

// bg-gradient-to-tl from-slate-950 to-slate-800
