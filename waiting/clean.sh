rm -rf accounts/__pycache__
rm -rf accounts/migrations
rm -rf menu/__pycache__
rm -rf menu/migrations
rm db.sqlite3
. ../.venv/bin/activate
./manage.py makemigrations accounts
./manage.py makemigrations menu
./manage.py migrate