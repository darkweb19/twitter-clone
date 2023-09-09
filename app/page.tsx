"use client";
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import {
	BiHomeCircle,
	BiHash,
	BiUser,
	BiMoney,
	BiImageAlt,
} from "react-icons/bi";

// import "./globals.css";
import { SlOptions } from "react-icons/sl";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import FeedCard from "@/components/FeedCard";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/queries/user";
import { userCurrentUser } from "@/hooks/user";
import Image from "next/image";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";
import { useQueryClient } from "@tanstack/react-query";

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
	const { user } = userCurrentUser();
	const { tweets = [] } = useGetAllTweets();
	const { mutate } = useCreateTweet();

	const [content, setContent] = useState("");

	const handleCreateTweet = useCallback(() => {
		mutate({
			content,
		});
	}, [content, mutate]);

	const handleSelectImage = useCallback(() => {
		const input = document.createElement("input");
		input.setAttribute("type", "file");
		input.setAttribute("accept", "image/*");
		input.click();
	}, []);

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
				<div className="col-span-3  mr-20 relative ">
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

						<div className="w-56 absolute bottom-5 border flex gap-2 justify-center items-center bg-slate-800 rounded-xl">
							{user && user.profileImageUrl && (
								<Image
									className="rounded-full mt-5"
									src={user?.profileImageUrl}
									alt="nothing"
									height={50}
									width={50}
								/>
							)}
							<div>
								<h3 className="text-sm">{user?.firstname}</h3>
								<h3 className="text-sm">{user?.lastname}</h3>
							</div>
						</div>
					</div>
				</div>
				<div className="col-span-6 border-r-[1px] border-l-[1px] h-screen overflow-scroll border-gray-600">
					<div>
						<div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-4  hover:bg-slate-900 transition-all cursor-pointer">
							<div className="grid grid-cols-12 gap-3">
								<div className="col-span-1 ">
									{user?.profileImageUrl && (
										<Image
											className="rounded-full"
											src={user?.profileImageUrl}
											alt="user-image"
											height={50}
											width={50}
										/>
									)}
								</div>
								<div className="col-span-11">
									<textarea
										value={content}
										onChange={(e) =>
											setContent(e.target.value)
										}
										className=" w-full bg-transparent text-xl px-3 border-b border-slate-700   "
										placeholder="What's happening?"
										rows={4}
									></textarea>
									<div className="mt-2 flex justify-between items-center ">
										<BiImageAlt
											onClick={handleSelectImage}
											className="text-xl"
										/>
										<button
											onClick={handleCreateTweet}
											className="bg-[#1d9bf0] font-semibold py-1 px-4 text-sm rounded-full "
										>
											Tweet
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					{tweets?.map((tweet) =>
						tweet ? (
							<FeedCard key={tweet?.id} data={tweet as Tweet} />
						) : null
					)}
				</div>
				{/* google login button  */}

				<div className="col-span-3 p-5 ">
					{!user && (
						<div className=" p-5 bg-slate-700 rounded-lg">
							<h1 className="my-2 text-2xl">New to Twitter</h1>
							<GoogleLogin onSuccess={handleLoginWithGoole} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
