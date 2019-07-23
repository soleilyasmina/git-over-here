const { green } = require('./style');

const completion = (number, char) => {
  let output = '';
  for (let i = 0; i < number; i++) {
    output += char;
  }
  return output;
};

const progress = (current, size) => {
  const percent = Math.floor((size / current) * 100);
  const stars = completion(Math.floor(percent / 2.5), '*');
  const remaining = completion(40 - Math.floor(percent / 2.5), '_');
  return `${green(stars)}${remaining} [${green(percent)}%]`;
};

console.log(progress(0, 27));

module.exports = {
  progress,
};
