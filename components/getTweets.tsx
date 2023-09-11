import { graphqlClient } from "@/clients/api";
import { getAllTweetsQuery } from "@/graphql/queries/twitter";
import FeedCard from "./FeedCard";
import { Tweet } from "@/gql/graphql";

export default async function GetTweets() {
	const allTweets = await graphqlClient.request(getAllTweetsQuery);

	return (
		<div>
			{allTweets.getAllTweets?.map((tweet) =>
				tweet ? <FeedCard data={tweet as Tweet} key={tweet.id} /> : null
			)}
		</div>
	);
}
