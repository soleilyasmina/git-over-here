const axios = require('axios');
const prompt = require('readline-sync');

const BASE_URL = 'https://git.generalassemb.ly/';

const main = async () => {
  try {
    console.log(`echo Welcome to Git Over Here!`);
    const COHORT = prompt.question(`What is the name of your cohort? \n`);
    const REPO = prompt.question(`What is the name of your repo? \n`);
    console.log('\n');
    const resp = await axios({
      method: 'get',
      url: `https://git.generalassemb.ly/api/v3/repos/${COHORT}/${REPO}/pulls`
    });
    console.log(`rm -rf ${REPO} && mkdir ${REPO} && cd ${REPO}`);
    const submits = resp.data.forEach(item => {
      let user = item.user.login;
      console.log(`git clone ${BASE_URL}${user}/${REPO} ${user}`);
      console.log(`cd ${user} && npm install && cd ..`);
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
