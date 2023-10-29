import 'dotenv/config';
import { getProjectByNumber, getProjects } from './projects';

console.log(process.env.GITHUB_ACCESS_TOKEN);

getProjects(process.env.GITHUB_ACCESS_TOKEN ?? '', 'freitzzz').then(
	(result) => {
		console.log('\n\n getProjects');
		console.log(result);
		console.log(result.user.projectsV2.nodes);
	}
);

getProjectByNumber(
	process.env.GITHUB_ACCESS_TOKEN ?? '',
	'rutesantos4',
	1
).then((result) => {
	console.log('\n\n getProjectByNumber');
	console.log(result);
	console.log(result.user.projectV2.creator);
	const nodes = result.user.projectV2.items.nodes;
	for (let index = 0; index < nodes.length; index++) {
		const content = nodes[index];
		console.log(content);
	}
});