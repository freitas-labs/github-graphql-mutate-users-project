import { GraphQlQueryResponseData, graphql } from '@octokit/graphql';
import { AddedIssueInfo } from './data';

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

export async function getProjectByNumber(
	githubToken: string,
	owner: string,
	projectNumber: number
): Promise<GraphQlQueryResponseData> {
	const graphqlWithAuth = graphql.defaults({
		headers: {
			authorization: `Bearer ${githubToken}`
		}
	});

	return await graphqlWithAuth(
		`
        query($userLogin: String!, $number: Int!){
            user(login: $userLogin){
              projectV2(number: $number) {
                createdAt
                updatedAt
                id
                title
                number
                creator {
                    login
                }
                items(first: 10) {
                    nodes {
                        content {
                            ... on Issue {
                                title
                                url
                            }
                        }
                    }
                }
              }
            }
          }
        `,
		{
			userLogin: `${owner}`,
			number: Number(`${projectNumber}`)
		}
	);
}

export async function addIssues2Project(
	githubToken: string,
	owner: string,
	projectId: string,
	issuesId: string[]
): Promise<AddedIssueInfo[]> {
	let result: AddedIssueInfo[] = [];

	for (let index = 0; index < issuesId.length; index++) {
		const issueId = issuesId[index];
		const newAdded = await addIssue2Project(
			githubToken,
			owner,
			projectId,
			issueId
		);
		result = result.concat(newAdded.addProjectV2ItemById);
	}

	return result;
}

export async function addIssue2Project(
	githubToken: string,
	owner: string,
	projectId: string,
	issueId: string
): Promise<GraphQlQueryResponseData> {
	const graphqlWithAuth = graphql.defaults({
		headers: {
			authorization: `Bearer ${githubToken}`
		}
	});

	return await graphqlWithAuth(
		`
        mutation($userLogin: String!, $projectId: ID!, $issueId: ID!) {
            addProjectV2ItemById(input: {clientMutationId: $userLogin projectId: $projectId contentId: $issueId}) {
                clientMutationId 
                item {
                    id
                }
            }
          }
        `,
		{
			userLogin: `${owner}`,
			projectId: `${projectId}`,
			issueId: `${issueId}`
		}
	);
}
