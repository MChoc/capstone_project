heroku pg:reset --confirm waiting-for-the-train-api
python waiting/manage.py migrate
python waiting/manage.py loaddata database.json