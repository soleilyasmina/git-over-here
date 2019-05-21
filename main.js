const axios = require('axios');
const prompt = require('readline-sync');
const {
  green, blue, red, bell, echo,
} = require('./style');

const { log } = console;

require('dotenv').config();

const BASE_URL = 'https://git.generalassemb.ly/';

const setCohort = () => {
  if (process.env.COHORT) {
    echo(`Git Over Here is pulling from ${blue(process.env.COHORT)}. To change that, exit and run ${green('npm run setup')}.`);
    return process.env.COHORT;
  }
  echo(`What is the name of your ${blue('GitHub organization')}? e.g. ${green('sei-nyc-jeopardy')}\n`);
  return prompt.question();
};

const main = async () => {
  if (process.env.COWPOKE) {
    echo(`Welcome to ${blue('Git Over Here')}, ${green(process.env.COWPOKE)}!`);
  } else {
    echo(`Welcome to ${blue('Git Over Here')}!`);
  }
  const COHORT = setCohort();
  let running = true;
  while (running) {
    try {
      echo(`Which ${blue('repository')} do you want to pull from? e.g. ${green('js-data-types-homework')}\n`);
      const REPO = prompt.question();
      const resp = await axios({
        method: 'get',
        url: `https://git.generalassemb.ly/api/v3/repos/${COHORT}/${REPO}/pulls`,
        headers: {
          Authorization: `token ${process.env.TOKEN}`,
        },
      });
      echo(`${green('Repo found!')}`);
      if (resp.data.length > 0) {
        echo(`${green(`${resp.data.length !== 1 ? `${resp.data.length} submissions` : '1 submission'} pulled.`)} Copying into ${blue(`${REPO}`)}.`);
        echo(`Do you need to install any dependencies with ${blue('NPM')}? ${green('yes')}/${red('no')}\n`);
        const NPM = prompt.question();
        echo(`Do you need to bundle any ${blue('gems')}? ${green('yes')}/${red('no')}\n`);
        const BUNDLE = prompt.question();
        log(`cd .. && rm -rf ${REPO} && mkdir ${REPO} && cd ${REPO}`);
        resp.data.forEach((item) => {
          const user = item.user.login;
          let title = item.title.split(' ')[0].replace(`'s`,'');
          if (process.argv[2] === '-g') title += `-${user}`;
          const branch = item.head.ref;
          echo(`Cloning down ${title}.`);
          log(`git clone --single-branch --branch ${branch} ${BASE_URL}${user}/${REPO} ${title} --quiet`);
          if (NPM === 'yes' || NPM === 'y') log(`node ../git-over-here/npm.js ${REPO} ${title} | bash`);
          if (BUNDLE === 'yes' || BUNDLE === 'y') log(`node ../git-over-here/bundle.js ${REPO} ${title} | bash`);
        });
        echo(`${green('Fetch complete!')}`);
      } else { echo(green('0 submissions found.')); }
      echo(`Would you like to pull another repo? ${green('yes')}/${red('no')}\n`);
    } catch (e) {
      bell();
      let status;
      try {
        status = e.response.status;
      } catch (err) {
        status = undefined;
      }
      switch (status) {
        case 404:
          echo(`${red('Sorry, this repo was not found.')}`);
          break;
        case undefined:
          echo(`${red('Sorry, your connection was interrupted.')}`);
          break;
        default:
          echo(`${red('Error.')}`);
          echo(`${status}`);
          break;
      }
      echo(`Would you like to try again? ${green('yes')}/${red('no')}\n`);
    } finally {
      const tryAgain = prompt.question();
      if (tryAgain !== 'yes' && tryAgain !== 'y') {
        echo(`Thank you for using ${blue('Git Over Here')}.`);
        running = false;
      }
    }
  }
  process.exit();
};

main();
