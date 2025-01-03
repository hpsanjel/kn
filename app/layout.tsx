import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ActiveMenuProvider } from "@/context/ActiveMenuContext";
import GoToTopButton from "@/components/GoToTopBottom";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Gurung KNS Entertainment | Home",
	description: "Developed by Hari Sanjel",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<AuthProvider>
				<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
					<ActiveMenuProvider>{children}</ActiveMenuProvider>
					<GoToTopButton />
					<Toaster position="bottom-right" reverseOrder={false} />
				</body>
			</AuthProvider>
		</html>
	);
}
