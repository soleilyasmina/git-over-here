. .env
. style.sh

function main() {
  DIR=$(echo $3 | sed 's/%20/-/g' | cut -d' ' -f2)
  echo "Cloning down $DIR."
  git clone --single-branch --branch $4 "https://git.generalassemb.ly/$2/$1.git" --quiet $DIR
  cd $DIR

  echo "Checking dependencies for $DIR."
  NPMEXISTS=$(find . -name 'package.json' ! -path '*node_modules*')
  GEMEXISTS=$(find . -name 'Gemfile')

  if [ -z "$NPMEXISTS" ]
  then
    echo "No package.json detected. Skipping installation."
  else
    echo "Installing JS dependencies."
    echo $NPMEXISTS |\
      xargs -I '{}' sh -c "cd $(dirname '{}') && npm i --quiet && cd -"
  fi

  if [ -z "$GEMEXISTS" ]
  then
    echo "No Gemfile detected. Skipping installation."
  else
    echo "Installing Ruby dependencies."
    echo $GEMEXISTS |\
    xargs -I '{}' sh -c "cd $(dirname '{}') && bundle install --quiet && cd -"
  fi

  cd ..
}

export -f main

printf $RESET

if [ -z "$COHORT" ]
then
  echo "No cohort registered! Please run$GREEN sh setup.sh!$RESET" && exit 1
fi
printf $GREEN
printf "${OPENER}"
printf $RESET

echo "Welcome to Git Over Here,$BLUE $USER$RESET!"
echo "What$GREEN repo$RESET would you like to grade? (e.g.$GREEN sequelize-pizza-express-routes)$RESET"
read REPO

cd ..
rm -rf $REPO
mkdir $REPO
cd $REPO

SUCCESS=$(curl "https://git.generalassemb.ly/api/v3/repos/$COHORT/$REPO/pulls" -H "Authorization: token $TOKEN" |\
  grep -o "Not Found")

if [ "$SUCCESS" == "Not Found" ]
then
  printf "$RED"
  echo "Repository not found. Please try again."
else
  printf "$GREEN"
  echo "Repository found!"
  printf "$RESET"
  OPENPRS="$(curl https://git.generalassemb.ly/api/v3/repos/$COHORT/$REPO/pulls\?state\=all -H "Authorization: token $TOKEN" | jq '.[] | .state' | grep "open" | wc -l | awk '$1=$1')"
  echo "You have $OPENPRS open submissions, cloning into$BLUE $REPO$RESET."
  curl "https://git.generalassemb.ly/api/v3/repos/$COHORT/$REPO/pulls" -H "Authorization: token $TOKEN" |\
    jq '.[] | @uri "\(.user.login) \(.title) \(.head.ref)"' |\
    xargs -L 3 -I {} sh -c "main $REPO {}"
fi

printf "$RESET"

echo "Thank you for using$GREEN Git Over Here."
