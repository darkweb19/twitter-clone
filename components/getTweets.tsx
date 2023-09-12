import FeedCard from "./FeedCard";
import { Tweet } from "@/gql/graphql";
import { useGetAllTweets } from "@/hooks/tweet";

export default function GetTweets() {
	const tweets = useGetAllTweets();

	return (
		<div>
			{tweets.tweets?.map((tweet: any) =>
				tweet ? <FeedCard data={tweet as Tweet} key={tweet.id} /> : null
			)}
		</div>
	);
}
