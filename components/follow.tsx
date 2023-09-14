"use client";
import { graphqlClient } from "@/clients/api";
import {
	followUserMutation,
	unFollowUserMutation,
} from "@/graphql/mutation/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

export default function Follow({
	id,
	userInfo,
}: {
	id: string;
	userInfo: any;
}) {
	const { user: currentUser } = useCurrentUser();
	const queryClient = useQueryClient();

	const amIFollowing = useMemo(() => {
		if (!userInfo) return false;
		return (
			(currentUser?.following?.findIndex(
				(el) => el?.id === userInfo?.id
			) ?? -1) >= 0
		);
	}, [currentUser?.id, userInfo]);

	const handleFollowUser = useCallback(async () => {
		if (!userInfo?.id) return;

		await graphqlClient.request(followUserMutation, {
			to: userInfo?.id,
		});

		await queryClient.invalidateQueries(["current-user"]);
	}, [userInfo?.id, queryClient]);

	const handleUnFollowUser = useCallback(async () => {
		if (!userInfo?.id) return;

		await graphqlClient.request(unFollowUserMutation, {
			to: userInfo?.id,
		});
		await queryClient.invalidateQueries(["current-user"]);
	}, [userInfo?.id, queryClient]);

	return (
		<div>
			{currentUser?.id !== userInfo?.id && (
				<>
					{amIFollowing ? (
						<button
							onClick={handleUnFollowUser}
							className="bg-white text-black px-3 py-1 font-bold rounded-full text-sm"
						>
							UnFollow
						</button>
					) : (
						<button
							onClick={handleFollowUser}
							className="bg-white text-black px-3 py-1 font-bold rounded-full text-sm"
						>
							Follow
						</button>
					)}
				</>
			)}
		</div>
	);
}
