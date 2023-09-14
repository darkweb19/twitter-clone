// "use client";
import { graphqlClient } from "@/clients/api";
import FeedCard from "@/components/FeedCard";
import Follow from "@/components/follow";
import { Tweet } from "@/gql/graphql";
import { getUserById } from "@/graphql/queries/user";
import Image from "next/image";
import { BsArrowLeftShort } from "react-icons/bs";

export default async function Page({ params }: { params: { id: string } }) {
	const id = params.id;
	const userInfo = await graphqlClient.request(getUserById, { id });

	if (id !== userInfo.getUserById?.id) {
		return <div>Page not found</div>;
	} else {
		return (
			<div>
				<nav className=" flex items-center gap-3 py-3 px-3">
					<BsArrowLeftShort className="text-4xl" />
					<div>
						<h1 className="text-lg font-bold gap-3">
							{userInfo.getUserById.firstname}{" "}
							{userInfo.getUserById.lastname}
						</h1>
						<h2 className="text-sm font-bold text-slate-500">
							{userInfo.getUserById?.tweets?.length} Tweets
						</h2>
					</div>
				</nav>
				<div className="p-4 border-b border-slate-800">
					{userInfo?.getUserById?.profileImageUrl && (
						<Image
							className="rounded-full"
							src={userInfo?.getUserById?.profileImageUrl}
							alt="Profile Image"
							width={100}
							height={100}
						/>
					)}

					<h1 className="mt-5 text-lg font-bold gap-3">
						{userInfo.getUserById.firstname}{" "}
						{userInfo.getUserById.lastname}
					</h1>
					<div className="flex justify-between items-center">
						<div className="flex gap-4 mt-2 text-sm font-bold text-gray-400">
							<span>
								{userInfo.getUserById.followers?.length}{" "}
								Followers
							</span>
							<span>
								{userInfo.getUserById.following?.length}{" "}
								Following
							</span>
						</div>
						<Follow id={id} userInfo={userInfo.getUserById} />
					</div>
				</div>
				<div>
					{userInfo?.getUserById?.tweets?.map((tweet) => (
						<FeedCard data={tweet as Tweet} key={tweet?.id} />
					))}
				</div>
			</div>
		);
	}
}
