# capstone-project-waiting-for-the-train
capstone-project-waiting-for-the-train created by GitHub Classroom

## Setup

Ensure you have at least npm version 6.10.0 and node version 10.0.0 before starting the setup.

#### Using the Setup Script
* Run `./setup.sh`
* Note that the setup script has been tested and is known to work on linux systems and Windows Subsystem for Linux. If you are using any other platform, please follow the manual setup instructions below.
#### Manual Setup
* install dependencies:
  * `sudo apt install npm python3.8 libpq-dev python3-pip virtualenv python3.8-dev`
* create a virtual environment in the project root folder:
  * `virtualenv --python=<PATH_TO_PYTHON3.8> .venv`
* activate the new environment
  * `. .venv/bin/activate`
* install requirements
  * `pip install -r requirements.txt`
* Set up the database and populate with dummy data
  * `cd waiting && ./clean.sh`
* Navigate to the front-end folder from the project root directory
  * `cd front-end`
* Install front end dependencies
  * `npm install`

## Running the application
#### Starting the server
* Navigate into the waiting folder from the project root directory
  * `cd waiting`
* Start the server
  * `python3 manage.py runserver 5000`
* Access the api documentation on `http://127.0.0.1:5000/swagger/`

#### Starting the front end
* Navigate into the front-end folder from the project root directory
  * `cd front-end`
* Start the front end
  * `npx ng serve`
* The webpage can now be accessed on `http://localhost:4200/`


## Development Instructions
#### To migrate an app
* `./manage.py makemigrations app_name`
  * app_name would be the different apps e.g. users or menu folder

#### To create/update the database based on migrations
* `./manage.py migrate`

#### To clean the database and reupload dummy data
* `./clean.sh`

## Authentication on swagger documentation page
* login using the `/rest-auth/login/` endpoint
* Copy the token returned
* Click on authorise on the top right of the page and under the 'Bearer  (apiKey)' section, enter 'Token [token]' where [token] is the copied token from the login.
