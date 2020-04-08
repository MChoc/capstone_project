rm -rf accounts/__pycache__
rm -rf accounts/migrations/00*
rm -rf menu/__pycache__
rm -rf menu/migrations/00*
rm db.sqlite3
. ../.venv/bin/activate
./manage.py makemigrations accounts
./manage.py makemigrations menu
./manage.py migrate
./manage.py shell < dummy_data.py
./manage.py dumpdata > menu/fixtures/dump.json