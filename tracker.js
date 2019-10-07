const prompt = require('readline-sync');
const {
  blue, green, echo,
} = require('./style');

require('dotenv').config();

const tracker = async () => {
  if (!process.env.COWPOKE || !process.env.COHORT) {
    echo(`Sorry, partner, you need to run ${blue('npm run setup')}, then come back.`);
    return;
  }
  echo(`Welcome to ${blue('Bounty Hunter')}, ${green(process.env.COWPOKE)}.`);
  echo('Which homework would you like to update?');
  echo(prompt.question());
};

tracker();
