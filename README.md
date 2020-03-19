# Git Over Here
![Git Cowpoke](./git-over-here.jpg)

A homework helper for GA IAs. Inspired by simon-script.

## Installation!
If this is your first time using _Git Over Here_, [make a personal access token](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line#creating-a-token) with __repo__ permissions, then run `sh setup.sh` to get started. Enter the name of your GitHub enterprise organization (e.g. `sei-nyc-pirates`), and your token.
Git Over Here will only ask for a token if you have not provided one. After you've set it up the first time, you should not need to provide a new one. In addition, run `brew install jq`, to get JQ, a shell JSON parser.

## How to Use!

To use Git Over Here, run `sh main.sh`.

Then enter the repo(s) you'd like to pull from (e.g. ```js-data-types-homework``` or `candies rails-books-hw birds-express-routes`).

> _Git Over Here_ will automatically clone the branch that students have submitted for their pull requests, and handle any dependencies for Bundle and NPM.

Pulling from the same repository twice will replace the old copy with the new open pulls.

## Upcoming Features:

- Finding Current Homeworks
- Refreshing Homeworks
