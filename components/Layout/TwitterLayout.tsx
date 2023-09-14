import React, { useCallback, useMemo } from "react";
import Image from "next/image";
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import { BiHomeCircle, BiHash, BiUser, BiMoney } from "react-icons/bi";
import { SlOptions } from "react-icons/sl";
import { useCurrentUser } from "@/hooks/user";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/queries/user";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

interface TwitterLayoutProps {
	children: React.ReactNode;
}

interface TwitterSidebarButton {
	title: string;
	icon: React.ReactNode;
	link: string;
}

const TwitterLayout: React.FC<TwitterLayoutProps> = (props) => {
	const { user } = useCurrentUser();

	const queryClient = useQueryClient();
	const sideBarMenuItems: TwitterSidebarButton[] = useMemo(
		() => [
			{
				title: "Home",
				icon: <BiHomeCircle />,
				link: "/",
			},

			{ title: "Explore", icon: <BiHash />, link: "/" },
			{
				title: "Notifications",
				icon: <BsBell />,
				link: "/",
			},
			{
				title: "Messages",
				icon: <BsEnvelope />,
				link: "/",
			},
			{
				title: "Bookmarks",
				icon: <BsBookmark />,
				link: "/",
			},
			{
				title: "Verified",
				icon: <BiMoney />,
				link: "/",
			},
			{
				title: "Profile",
				icon: <BiUser />,
				link: `/${user?.id}`,
			},
			{ title: "More", icon: <SlOptions />, link: "/" },
		],
		[user?.id]
	);

	const handleLoginWithGoole = useCallback(
		async (cred: CredentialResponse) => {
			const googleToken = cred.credential;
			if (!googleToken) return toast.error(`Google token not found`);

			const { verifyGoogleToken } = await graphqlClient.request(
				verifyUserGoogleTokenQuery,
				{
					token: googleToken,
				}
			);
			toast.success("Verified Success");
			console.log(verifyGoogleToken);
			if (verifyGoogleToken)
				window.localStorage.setItem("twitter_token", verifyGoogleToken);

			await queryClient.invalidateQueries(["current-user"]);
		},
		[queryClient]
	);
	const handleLogout = useCallback(() => {
		// if (user?.id) toast.error("No user found");
		window.localStorage.removeItem("twitter_token");
		toast.success("Logout Sucess");
	}, [user]);

	return (
		<div>
			{" "}
			<div className="grid grid-cols-12 gap-3 h-screen w-screen sm:px-48">
				<div className="col-span-2 sm:col-span-3 pt-1 flex sm:justify-end pr-4 relative ">
					<div>
						<div className=" h-fit w-fit text-2xl hover:bg-gray-700 rounded-full p-4 cursor-pointer transition-all">
							<BsTwitter />
						</div>
						<div className="mt-1 text-xl pr-4">
							<ul>
								{sideBarMenuItems.map((item) => (
									<Link
										className="flex justify-start items-center gap-4 px-3 py-3 cursor-pointer rounded-full w-fit hover:bg-gray-900 mt-2"
										href={item.link}
										key={item.title}
									>
										<span className="text-2xl">
											{item.icon}{" "}
										</span>
										<span className="hidden sm:inline">
											{item.title}{" "}
										</span>
									</Link>
								))}
							</ul>
							<div className="mt-5 px-3 ">
								<button className="hidden sm:block bg-[#1d9bf0] font-semibold py-3 px-4 text-lg rounded-full w-full">
									Tweet
								</button>
								<button className="bock sm:hidden bg-[#1d9bf0] font-semibold py-3 px-4 text-lg rounded-full w-full">
									<BsTwitter />
								</button>
							</div>
						</div>

						{user && user.profileImageUrl && (
							<Image
								className="rounded-full mt-5"
								src={user?.profileImageUrl}
								alt="nothing"
								height={50}
								width={50}
							/>
						)}
						<div className="hidden sm:block">
							<h3 className="text-sm">{user?.firstname}</h3>
							<h3 className="text-sm">{user?.lastname}</h3>
						</div>
					</div>
				</div>
				<div className="col-span-10 sm:col-span-6 border-r-[1px] border-l-[1px] h-screen overflow-scroll border-gray-600">
					{props.children}
				</div>

				{/* google login button  */}

				<div className="col-span-0 sm:col-span-3 sm:p-5 ">
					{!user && (
						<div className=" sm:block p-5 bg-slate-700 rounded-lg">
							<h1 className="my-2 sm:text-2xl">New to Twitter</h1>
							<GoogleLogin onSuccess={handleLoginWithGoole} />
						</div>
					)}
					{user?.id && (
						<button
							onClick={handleLogout}
							className="hidden sm:block bg-[#1d9bf0] font-semibold py-3 px-4 text-lg rounded-full w-full"
						>
							Logout
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default TwitterLayout;
