const axios = require('axios');

const BASE_URL = 'https://git.generalassemb.ly/';
const COHORT = 'sei-nyc-jeopardy';
const REPO = process.argv[2];

const main = async () => {
  const resp = await axios({
    method: 'get',
    url: `https://git.generalassemb.ly/api/v3/repos/${COHORT}/${REPO}/pulls`
  });
  const submits = resp.data.forEach(item => {
    let user = item.user.login;
    console.log(`git clone ${BASE_URL}${user}/${REPO} ${user}`);
    console.log(`cd ${user} && npm install && cd ..`);
  });
}

main();
