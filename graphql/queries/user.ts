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
			followers {
				id
				firstname
				lastname
				profileImageUrl
			}
			following {
				id
				firstname
				lastname
				profileImageUrl
			}
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
			followers {
				firstname
				lastname
				profileImageUrl
			}
			following {
				firstname
				lastname
				profileImageUrl
			}
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
