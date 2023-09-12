"use client";
import GetTweets from "@/components/getTweets";
import HomeText from "@/components/homeText";

export default function HomeTweets() {
	return (
		<div>
			{/* Text area for adding tweets client components */}
			<HomeText>
				<GetTweets />
			</HomeText>
		</div>
	);
}
