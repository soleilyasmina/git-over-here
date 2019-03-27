const prompt = require('readline-sync');
const { green, red, blue } = require('./style');

const setup = () => {
  console.log(`echo What is the name of your ${blue('current GitHub organization')}? e.g. ${green('sei-nyc-jeopardy')}`);
  const COHORT = prompt.question();
  console.log(`echo What would you like to be called by ${blue('Git Over Here')}?`);
  const COWPOKE = prompt.question();
  console.log(`echo What is your ${blue('personal access token')}?\n`);
  const TOKEN = prompt.question();
  let info = `\"COHORT=${COHORT}\nCOWPOKE=${COWPOKE}\nTOKEN=${TOKEN}\"`;
  console.log(`touch .env && echo ${info} > .env`);
  console.log(`echo ${green('Thank you!')}`);
  console.log(`echo Would you like to run ${blue('Git Over Here')}, or exit setup? run/exit`);
  const RUN = prompt.question();
  RUN === 'run' ? console.log(`npm start`) : process.exit();
};

setup();
