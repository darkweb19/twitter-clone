import { graphql } from "../../gql";
export const verifyUserGoogleTokenQuery = graphql(
	`
		#graphql
		query VerifyUserGoogleToken($token: String!) {
			verifyGoogleToken(token: $token)
		}
	`
);

export const getCurrentUserQuery = graphql(`
	query GetCurrentUser {
		getCurrentUser {
			id
			email
			profileImageUrl
			firstname
			lastname
			tweets {
				id
				content
				author {
					id
					firstname
					lastname
					profileImageUrl
				}
			}
		}
	}
`);

export const getUserById = graphql(`
	#graphql
	query GetUserById($id: ID!) {
		getUserById(id: $id) {
			id
			firstname
			profileImageUrl
			lastname
			tweets {
				content
				id
				author {
					id
					firstname
					lastname
					email
					profileImageUrl
				}
			}
		}
	}
`);
