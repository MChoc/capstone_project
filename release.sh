python manage.py makemigrations accounts
python manage.py makemigrations menu
python manage.py migrate
python manage.py shell < waiting/dummp_data.py
python manage.py dumpdata > dump.json