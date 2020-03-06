# capstone-project-waiting-for-the-train
capstone-project-waiting-for-the-train created by GitHub Classroom

Setup
* install python3.8
* create a virtual environment
* recommend virtualenv
  * virtualenv --python=python3.8
* activate the new environment and install requirements
  * pip install -r requirements.txt

To migrate an app
* ./manage.py makemigrations app_name

To create/update the database based on migrations
* ./manage.py migrate

To start the server
* python3 manage.py runserver 5000
* navigate to: localhost:5000

localhost:5000/admin
* admin panel to manipulate objects in the database

localhost:5000/api
* summary of api calls available