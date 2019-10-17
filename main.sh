. .env
. style.sh

function main() {
  DIR=$(echo $3 | sed 's/%20/-/g' | cut -d' ' -f2)
  REPOEXISTS=$(ls | grep $DIR)
  if [ "$5" == "open" ]
  then
    if [ -z "$REPOEXISTS" ]
    then
      # CLONE
      echo "Cloning down $DIR."
      git clone --single-branch --branch $4 "https://git.generalassemb.ly/$2/$1.git" --quiet $DIR
      cd $DIR
    else
      # PULL FROM CURRENT BRANCH
      cd $DIR
      git pull origin $4
    fi

    echo "Checking dependencies for $DIR."
    NPMEXISTS=$(find . -name 'package.json' ! -path '*node_modules*')
    GEMEXISTS=$(find . -name 'Gemfile')

    if [ -z "$NPMEXISTS" ]
    then
    echo "No package.json detected.$RED Skipping installation.$RESET"
    else
      echo "Installing JS dependencies."
      echo $NPMEXISTS |\
        xargs -I '{}' sh -c "cd $(dirname '{}') && npm i --silent && cd - > /dev/null"
    fi

    if [ -z "$GEMEXISTS" ]
    then
      echo "No Gemfile detected.$RED Skipping installation.$RESET"
    else
      echo "Installing Ruby dependencies."
      echo $GEMEXISTS |\
        xargs -I '{}' sh -c "cd $(dirname '{}') && bundle install --quiet && cd - > /dev/null"
    fi

    cd ..
  fi

  if [ "$5" == "closed" ] && [ -n "$REPOEXISTS" ]
  then
    echo "$DIR's homework is closed, removing directory."
    rm -rf $DIR
  fi

}

export -f main

printf $RESET

if [ -z "$COHORT" ]
then
  echo "No cohort registered! Please run$GREEN sh setup.sh!$RESET" && exit 1
fi

while [[ "$1" =~ ^- && ! "$1" == "--" ]];
do
  case $1 in
    -l | --lunch)
      . .env.lunch
      ;;
    -r | --refresh)
      REFRESH="true"
      ;;
    -h | --help)
      echo "usage: sh main.sh [-l | --lunch][-r | --refresh]"
      echo ""
      echo "options:"
      echo "  -h, --help      provides this help screen"
      echo "  -l, --lunch     reads from .env.lunch for repos"
      echo "  -r, --refresh   no hard delete, replace and remove instead" 
      exit
      ;;
  esac
  shift
done

printf $GREEN
printf "${OPENER}"
printf $RESET
REFRESH=""

echo "Welcome to Git Over Here,$BLUE $USER$RESET!"
echo "You're currently pulling from $GREEN$COHORT$RESET."

if [ -z "$REPOS" ]
then
  echo "What$GREEN repos$RESET would you like to grade? (e.g.$GREEN sequelize-pizza-express-routes rails-books-hw candies$RESET)"
  read INPUT
  REPOS=( $INPUT )
fi

for REPO in "${REPOS[@]}"
do
  SUCCESS=$(curl "https://git.generalassemb.ly/api/v3/repos/$COHORT/$REPO/pulls" -H "Authorization: token $TOKEN" |\
    grep -o "Not Found")

  if [ "$SUCCESS" == "Not Found" ]
  then
    printf "$RED"
    echo "Repository not found. Please try again."
  else
    cd ..
    if [ -z "$REFRESH" ]
    then
      rm -rf $REPO
    fi
    if [ -z "$(ls | grep $REPO)"]
    then
      mkdir $REPO
    fi
    cd $REPO

    printf "$GREEN"
    echo "Repository found for $REPO!"
    printf "$RESET"
    OPENPRS="$(curl https://git.generalassemb.ly/api/v3/repos/$COHORT/$REPO/pulls\?state\=all -H "Authorization: token $TOKEN" | jq '.[] | .state' | grep "open" | wc -l | awk '$1=$1')"
    echo "You have $OPENPRS submissions, cloning into$BLUE $REPO$RESET."
    curl "https://git.generalassemb.ly/api/v3/repos/$COHORT/$REPO/pulls?state=all" -H "Authorization: token $TOKEN" |\
      jq '.[] | @uri "\(.user.login) \(.title) \(.head.ref) \(.state)"' |\
      xargs -L 4 -I {} sh -c "main $REPO {}"
  fi

  printf "$RESET"
done

echo "Thank you for using$GREEN Git Over Here."
