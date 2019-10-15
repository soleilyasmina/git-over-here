. .env

echo "What is the name of your cohort's GitHub organization? (e.g. sei-nyc-pirates)"
read COHORT

echo "How would you like to be greeted by Git Over Here? (e.g. Cool Guy)"
read COWPOKE

if [ -z $TOKEN ]
then
  echo "What is your personal access token?"
  read TOKEN
else
  echo "Your token has been previously obtained."
fi

echo COHORT=$COHORT > .env
echo COWPOKE=$COWPOKE >> .env
echo TOKEN=$TOKEN >> .env
