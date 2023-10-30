import 'dotenv/config';
import {
	addIssue2Project,
	addIssues2Project,
	getProjectByNumber,
	getProjects
} from './projects';

console.log(process.env.GITHUB_ACCESS_TOKEN);

getProjects(process.env.GITHUB_ACCESS_TOKEN ?? '', 'freitzzz').then(
	(result) => {
		console.log('\n\n getProjects');
		console.log(result);
		console.log(result.user.projectsV2.nodes);
	}
);

getProjectByNumber(process.env.GITHUB_ACCESS_TOKEN ?? '', 'rutesantos4', 1).then(
	(result) => {
		console.log('\n\n getProjectByNumber');
		console.log(result);
		const issues = result.issues;
		for (let index = 0; index < issues.length; index++) {
			const content = issues[index];
			console.log(content);
		}
	}
);

addIssue2Project(
	process.env.GITHUB_ACCESS_TOKEN ?? '',
	'rutesantos4',
	'PVT_kwHOBj4sT84AI1rT',
	'I_kwDOHWKCn85mZAGb'
).then((result) => {
	console.log('\n\n addIssue2Project');
	console.log(result);
});

addIssues2Project(
	process.env.GITHUB_ACCESS_TOKEN ?? '',
	'rutesantos4',
	'PVT_kwHOBj4sT84AI1rT',
	['I_kwDOHWKCn85mZAGb', 'I_kwDOIiJCnc5eGLai', 'I_kwDOIjpcac5cgFwL']
).then((result) => {
	console.log('\n\n addIssues2Project');
	console.log(result);
});
