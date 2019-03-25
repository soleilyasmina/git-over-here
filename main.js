const axios = require('axios');
const prompt = require('readline-sync');
const { green, blue, red } = require('./style');
require('dotenv').config();

const BASE_URL = 'https://git.generalassemb.ly/';

const setCohort = () => {
  if (process.env.COHORT) {
    console.log(`echo Git Over Here is pulling from ${blue(process.env.COHORT)}. To change that, exit and run npm run setup.`);
    return process.env.COHORT;
  } else {
    console.log(`echo What is the name of your ${blue('GitHub organization')}? e.g. ${green('sei-nyc-jeopardy')}\n`);
    return prompt.question();
  }
}

const main = async () => {
  if (process.env.COWPOKE) {
    console.log(`echo Welcome to ${blue('Git Over Here')}, ${green(process.env.COWPOKE)}!`)
  } else {
    console.log(`echo Welcome to ${blue('Git Over Here')}!`);
  }
  let running = true;
  while (running) {
    try {
      const COHORT = setCohort();
      console.log(`echo Which ${blue('repository')} do you want to pull from? e.g. ${green('js-data-types-homework')}\n`);
      const REPO = prompt.question();
      const resp = await axios({
        method: 'get',
        url: `https://git.generalassemb.ly/api/v3/repos/${COHORT}/${REPO}/pulls`
      });
      console.log(`echo ${green('Repo found!')}`);
      console.log(`echo ${green(`${resp.data.length !== 1 ? resp.data.length + ' submissions' : '1 submission' } pulled.`)} Copying into ${blue(`${REPO}`)}.`);
      console.log(`echo Do you need to install any dependencies with ${blue('NPM')}? ${green('yes')}/${red('no')}\n`);
      const NPM = prompt.question();
      console.log(`cd .. && rm -rf ${REPO} && mkdir ${REPO} && cd ${REPO}`);
      const submits = resp.data.forEach(item => {
        let user = item.user.login;
        let title = item.title.split(' ')[0].replace(`'s`,'');
        console.log(`git clone ${BASE_URL}${user}/${REPO} ${title}`);
        console.log(`cd ${title} ${NPM === 'yes' ? '&& npm install' : ''} && cd ..`);
      });
      console.log(`echo ${green('Fetch complete!')}`);
      running = false;
    } catch (e) {
      let status;
        try {
          status = e.response.status;
        } catch (e) {
          status = undefined;
        }
      switch(status) {
        case 404:
          console.log(`echo ${red('Sorry, this repo was not found.')}`);
          break;
        case undefined:
          console.log(`echo ${red('Sorry, your connection was interrupted.')}`);
          break;
        default:
          console.log(`echo ${red('Error.')}`);
          console.log(`echo ${status}`)
          break;
      }
      console.log(`echo Would you like to try again? yes/no\n`);
      let tryAgain = prompt.question();
      if (tryAgain !== 'yes') {
        console.log(`echo Thank you for using ${style('Git Over Here', 'blue')}.`);
        running = false;
      }
    }
  }
  process.exit();
}

main();
