import Image from "next/image";
import React from "react";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { Tweet } from "@/gql/graphql";
import Link from "next/link";

interface FeedCardProps {
	data: Tweet;
}

const FeedCard: React.FC<FeedCardProps> = (props: FeedCardProps) => {
	const { data } = props;

	return (
		<div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-4  hover:bg-slate-900 transition-all cursor-pointer">
			<div className="grid grid-cols-12 gap-3">
				<div className="col-span-1 ">
					{data.author?.profileImageUrl && (
						<Image
							className="rounded-full"
							src={data.author?.profileImageUrl}
							alt="user-image"
							height={50}
							width={50}
						/>
					)}
				</div>
				<div className="col-span-11">
					<Link href={`${data.author?.id}`}>
						{" "}
						{data.author?.firstname} {data.author?.lastname}
					</Link>

					<p>{data.content}</p>
					<div className="flex items-center justify-between p-2 mt-5 text-xl w-[90%]">
						<div>
							<BiMessageRounded />
						</div>
						<div>
							<FaRetweet />
						</div>
						<div>
							<AiOutlineHeart />
						</div>
						<div>
							<BiUpload />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FeedCard;
