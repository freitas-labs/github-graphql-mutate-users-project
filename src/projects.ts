import { GraphQlQueryResponseData, graphql } from '@octokit/graphql';

export async function getProjects(
	githubToken: string,
	owner: string
): Promise<GraphQlQueryResponseData> {
	const graphqlWithAuth = graphql.defaults({
		headers: {
			authorization: `Bearer ${githubToken}`
		}
	});

	return await graphqlWithAuth(
		`
            query($userLogin: String!){
                user(login: $userLogin) {
                    projectsV2(first: 20) {
                        nodes {
                            createdAt
                            updatedAt
                            id
                            title
                            number
                            creator {
                                login
                            }
                        }
                    }
                }
            }
        `,
		{
			userLogin: `${owner}`
		}
	);
}