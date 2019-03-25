const reset = `$(tput sgr0)`; // adds attribute reset

const black = (text) => `$(tput setaf 0)${text+reset}`;
const red = (text) => `$(tput setaf 1)${text+reset}`;
const green = (text) => `$(tput setaf 2)${text+reset}`;
const yellow = (text) => `$(tput setaf 3)${text+reset}`;
const blue = (text) => `$(tput setaf 4)${text+reset}`;
const magenta = (text) => `$(tput setaf 5)${text+reset}`;
const cyan = (text) => `$(tput setaf 6)${text+reset}`;
const white = (text) => `$(tput setaf 7)${text+reset}`;

const bell = () => console.log(`tput bel`);

module.exports = {
  black, red, green, yellow, blue, magenta, cyan, white, bell
};
