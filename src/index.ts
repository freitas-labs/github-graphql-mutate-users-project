import 'dotenv/config';
import { getProjects } from './projects';

console.log(process.env.GITHUB_ACCESS_TOKEN);

getProjects(process.env.GITHUB_ACCESS_TOKEN ?? '', 'freitzzz').then(
	(result) => {
		console.log('\n\n getProjects');
		console.log(result);
		console.log(result.user.projectsV2.nodes);
	}
);