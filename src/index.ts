import sum from './sum';
import 'dotenv/config';

console.log(process.env.GITHUB_ACCESS_TOKEN);
console.log(sum(40, 2));
