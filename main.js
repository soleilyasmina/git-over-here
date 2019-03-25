const axios = require('axios');
const prompt = require('readline-sync');
require('dotenv').config();

const BASE_URL = 'https://git.generalassemb.ly/';
const colorText = (text, color) => {
  let reset = `$(tput sgr0)`; // adds attribute reset
  switch(color) {
    case 'blue':
      color = `$(tput setaf 4)`;
      break;
    case 'red':
      color = `$(tput setaf 1)`;
      break;
    case 'green':
      color = `$(tput setaf 2)`;
      break;
    default:
      color = '';
      break;
  }
  return color + text + reset;
}

const main = async () => {
  console.log(`echo Welcome to ${colorText('Git Over Here', 'blue')}!`);
  console.log(`echo ${process.env.COHORT}`);
  let running = true;
  while (running) {
    try {
      console.log(`echo What is the name of your ${colorText('GitHub organization', 'blue')}? e.g. ${colorText('sei-nyc-jeopardy','green')}\n`);
      const COHORT = prompt.question();
      console.log(`echo Which ${colorText('repository', 'blue')} do you want to pull from? e.g. ${colorText('js-data-types-homework', 'green')}\n`);
      const REPO = prompt.question();
            const resp = await axios({
        method: 'get',
        url: `https://git.generalassemb.ly/api/v3/repos/${COHORT}/${REPO}/pulls`
      });
      console.log(`echo ${colorText('Repo found!', 'green')}`);
      console.log(`echo ${colorText(`${resp.data.length !== 1 ? resp.data.length + ' submissions' : '1 submission' } pulled.`, 'green')} Copying into ${colorText(`${REPO}`, 'blue')}.`);
      console.log(`echo Do you need to install any dependencies with ${colorText('NPM', 'blue')}? ${colorText('yes', 'green')}/${colorText('no','red')}\n`);
      const NPM = prompt.question();
      console.log(`cd .. && rm -rf ${REPO} && mkdir ${REPO} && cd ${REPO}`);
      const submits = resp.data.forEach(item => {
        let user = item.user.login;
        let title = item.title.split(' ')[0].replace(`'s`,'');
        console.log(`git clone ${BASE_URL}${user}/${REPO} ${title}`);
        console.log(`cd ${title} ${NPM === 'yes' ? '&& npm install' : ''} && cd ..`);
      });
      console.log(`echo ${colorText('Fetch complete!', 'green')}`);
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
          console.log(`echo ${colorText('Sorry, this repo was not found.', 'red')}`);
          break;
        case undefined:
          console.log(`echo ${colorText('Sorry, your connection was interrupted.', 'red')}`);
          break;
        default:
          console.log('echo Error.');
          console.log(`echo ${status}`)
          break;
      }
      console.log(`echo Would you like to try again? yes/no\n`);
      let tryAgain = prompt.question();
      if (tryAgain !== 'yes') {
        console.log(`echo Thank you for using ${colorText('Git Over Here', 'blue')}.`);
        running = false;
      }
    }
  }
  process.exit();
}

main();
