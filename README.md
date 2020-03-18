# capstone-project-waiting-for-the-train
capstone-project-waiting-for-the-train created by GitHub Classroom

#### Setup
* install python3.8
* create a virtual environment
* recommend virtualenv
  * `virtualenv --python=python3.8 .ven`
* activate the new environment
  * cd into the folder where .venv sits
  * run `. .venv/bin/activate`
* install requirements
  * pip install -r requirements.txt

#### Shortcuts
* run all migrations
  * `./migrate.sh`
* start backend server
  * `./start_server.sh`

#### To migrate an app
* `./manage.py makemigrations app_name`
  * app_name would be the different apps e.g. users or menu folder

#### To create/update the database based on migrations
* `./manage.py migrate`

#### To start the server
* `python3 manage.py runserver 5000`
* navigate to: localhost:5000

localhost:5000/admin
* admin panel to manipulate objects in the database

localhost:5000/api
* summary of api calls available

localhost:5000/swagger
* Swagger documentation of available endpoints
* To authenticate:
    * login using the `/rest-auth/login/` endpoint
    * Use copy the token provided
    * Click on authorise on the top right of the page and under the 'Bearer  (apiKey)' section, enter 'Token [token]' where [token] is the copied token from the login.
