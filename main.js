const axios = require('axios');
const prompt = require('readline-sync');

const BASE_URL = 'https://git.generalassemb.ly/';

const main = async () => {
  try {
    console.log(`echo Welcome to Git Over Here!`);
    const COHORT = prompt.question(`What is the name of your GitHub organization? (e.g. sei-nyc-jeopardy)\n`);
    const REPO = prompt.question(`Which repository do you want to pull from? (e.g. js-data-types-homework)\n`);
    const NPM = prompt.question(`Do you need to install any dependencies with NPM? (yes/no) \n`);
    console.log('\n');
    const resp = await axios({
      method: 'get',
      url: `https://git.generalassemb.ly/api/v3/repos/${COHORT}/${REPO}/pulls`
    });
    console.log(`cd .. && rm -rf ${REPO} && mkdir ${REPO} && cd ${REPO}`);
    const submits = resp.data.forEach(item => {
      let user = item.user.login;
      let title = item.title.split(' ')[0].replace(`'s`,'');
      console.log(`git clone ${BASE_URL}${user}/${REPO} ${title}`);
      console.log(`cd ${title} ${NPM === 'yes' ? '&& npm install' : ''} && cd ..`);
    });
  } catch (e) {
    let { status } = e.response;
    switch(status) {
      case 404:
        console.log('echo Sorry, this repo was not found!');
        break;
      default:
        console.log('echo Error.');
        break;
    }
  }
}

main();
