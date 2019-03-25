const prompt = require('readline-sync');

const setup = () => {
  console.log(`echo What is the name of your current cohort"'"s GitHub organization? e.g. sei-nyc-jeopardy`);
  const COHORT = prompt.question();
  console.log(`echo What would you like to be called by Git Over Here?`);
  const USER = prompt.question();
  let info = `\"COHORT=${COHORT}\nUSER=${USER}\"`;
  console.log(`touch .env && echo ${info} > .env && echo .env >> .gitignore`);
  console.log(`echo Thank you!`);
};

setup();
