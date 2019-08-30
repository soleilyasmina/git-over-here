REPO=$1
COHORT=$2

function main() {
  echo $2 $3 $4
  git clone --single-branch --branch $4 "https://git.generalassemb.ly/$2/$1.git" $(echo $3 | sed 's/%20/-/g' | cut -d' ' -f2)
}

export -f main

curl "https://git.generalassemb.ly/api/v3/repos/$COHORT/$REPO/pulls" -H "Authorization: token $(sed -n 3p .env | cut -d'=' -f2)" | jq '.[] | @uri "\(.user.login) \(.title) \(.head.ref)"' | xargs -L 3 -I {} sh -c "main $REPO {}"
