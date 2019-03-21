const axios = require('axios');
const prompt = require('readline-sync');
const chalk = require('chalk');

const BASE_URL = 'https://git.generalassemb.ly/';

const main = async () => {
  try {
    console.log(`Welcome to ${chalk.blue('Git Over Here')}!`);
    const COHORT = prompt.question(`What is the name of your ${chalk.red('cohort')}? \n`);
    const REPO = prompt.question(`What is the name of your ${chalk.red('repo')}? \n`);
    console.log('\n');
    const resp = await axios({
      method: 'get',
      url: `https://git.generalassemb.ly/api/v3/repos/${COHORT}/${REPO}/pulls`
    });
    const submits = resp.data.forEach(item => {
      let user = item.user.login;
      console.log(`git clone ${BASE_URL}${user}/${REPO} ${user}`);
      console.log(`cd ${user} && npm install && cd ..`);
    });
  } catch (e) {
    let { status } = e.response;
    switch(status) {
      case 404:
        console.log('Sorry, this repo was not found!');
        break;
      default:
        console.log('Error.');
        break;
    }
  }
}

main();
