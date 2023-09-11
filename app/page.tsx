"use client";
import GetTweets from "@/components/getTweets";
import HomeText from "@/components/homeText";

export default async function HomeTweets() {
	return (
		<div>
			{/* Text area for adding tweets client components */}
			<HomeText>
				{/* displaying all tweets server components */}
				<GetTweets />
			</HomeText>
		</div>
	);
}
