"use client";
import "./globals.css";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GoogleOAuthProvider } from "@react-oauth/google";
import TwitterLayout from "@/components/Layout/TwitterLayout";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<QueryClientProvider client={queryClient}>
					<GoogleOAuthProvider clientId="547413022207-gps9u0g1ps5i33eiopqb6thb0f8ilmgj.apps.googleusercontent.com">
						<TwitterLayout>
							{children}
							<Toaster />
							<ReactQueryDevtools />
						</TwitterLayout>
					</GoogleOAuthProvider>
				</QueryClientProvider>
			</body>
		</html>
	);
}
