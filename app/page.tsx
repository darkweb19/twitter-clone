"use client";
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import { BiHomeCircle, BiHash, BiUser, BiMoney } from "react-icons/bi";
import { SlOptions } from "react-icons/sl";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import FeedCard from "@/components/FeedCard";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/queries/user";

interface TwitterSidebarButton {
	title: string;
	icon: React.ReactNode;
}

const sidebarMenuItems: TwitterSidebarButton[] = [
	{
		title: "Home",
		icon: <BiHomeCircle />,
	},
	{
		title: "Explore",
		icon: <BiHash />,
	},
	{
		title: "Notifications",
		icon: <BsBell />,
	},
	{
		title: "Messages",
		icon: <BsEnvelope />,
	},
	{
		title: "Bookmarks",
		icon: <BsBookmark />,
	},
	{
		title: "Verified",
		icon: <BiMoney />,
	},
	{
		title: "Profile",
		icon: <BiUser />,
	},
	{
		title: "More",
		icon: <SlOptions />,
	},
];

export default function Home() {
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
		},
		[]
	);

	return (
		<div>
			<div className="grid grid-cols-12 gap-3 h-screen w-screen px-32">
				<div className="col-span-3  mr-20   ">
					<div className=" h-fit w-fit text-2xl hover:bg-gray-700 rounded-full p-4 cursor-pointer transition-all">
						<BsTwitter />
					</div>
					<div className="mt-1 text-xl pr-4">
						<ul>
							{sidebarMenuItems.map((item) => (
								<li
									className="flex justify-start items-center gap-4 px-3 py-3 cursor-pointer rounded-full w-fit hover:bg-gray-900 mt-2"
									key={item.title}
								>
									<span className="text-2xl">
										{item.icon}{" "}
									</span>
									<span>{item.title} </span>
								</li>
							))}
						</ul>
						<div className="mt-5 px-3 ">
							<button className="bg-[#1d9bf0] font-semibold py-3 px-4 text-lg rounded-full w-full">
								Tweet
							</button>
						</div>
					</div>
				</div>
				<div className="col-span-6 border-r-[1px] border-l-[1px] h-screen overflow-scroll border-gray-600">
					<FeedCard />
					<FeedCard />
					<FeedCard />
					<FeedCard />
					<FeedCard />
					<FeedCard />
					<FeedCard />
					<FeedCard />
					<FeedCard />
					<FeedCard />
					<FeedCard />
					<FeedCard />
				</div>
				{/* google login button  */}
				<div className="col-span-3 p-5">
					<div className=" p-5 bg-slate-700 rounded-lg">
						<h1 className="my-2 text-2xl">New to Twitter</h1>
						<GoogleLogin onSuccess={handleLoginWithGoole} />
					</div>
				</div>
			</div>
		</div>
	);
}
