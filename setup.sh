. .env
. style.sh

printf $RESET
printf $GREEN
printf "${SETUP}"
printf $RESET

echo "Hello,$BLUE $USER$RESET!"

echo "What is the name of your cohort's$GREEN GitHub organization$RESET? (e.g.$GREEN sei-nyc-pirates$RESET)"
read COHORT

if [ -z $TOKEN ]
then
  echo "What is your$GREEN personal access token$RESET?"
  read TOKEN
else
  echo "Your$GREEN token$RESET has been previously obtained."
fi

echo COHORT="$COHORT" > .env
echo TOKEN="$TOKEN" >> .env
