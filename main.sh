. .env
. style.sh

printf $RESET

echo "Hello $USER!"
echo "What$GREEN repo$RESET would you like to grade? (e.g. sequelize-pizza-express-routes)"
read REPO

function main() {
  git clone --single-branch --branch $4 "https://git.generalassemb.ly/$2/$1.git" $(echo $3 | sed 's/%20/-/g' | cut -d' ' -f2)
}

export -f main

cd ..
rm -rf $REPO
mkdir $REPO
cd $REPO

curl "https://git.generalassemb.ly/api/v3/repos/$COHORT/$REPO/pulls" -H "Authorization: token $TOKEN" |\
  jq '.[] | @uri "\(.user.login) \(.title) \(.head.ref)"' |\
  xargs -L 3 -I {} sh -c "main $REPO {}"
