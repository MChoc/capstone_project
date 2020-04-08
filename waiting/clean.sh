rm -rf accounts/__pycache__
rm -rf accounts/migrations/00*
rm -rf menu/__pycache__
rm -rf menu/migrations/00*
rm db.sqlite3
. ../.venv/bin/activate
python manage.py makemigrations accounts
python manage.py makemigrations menu
python manage.py migrate
python manage.py shell < dummy_data.py
python manage.py dumpdata > ../dump.json
python manage.py dumpdata > menu/fixtures/dump.json
