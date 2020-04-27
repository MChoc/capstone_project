#!/bin/bash

# get filepath of project root dir
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $DIR

# install dependencies
sudo apt install npm python3.8 libpq-dev python3-pip virtualenv
cd front-end
npm install

cd $DIR
PYTHON_PATH=`which python3.8`
echo -e "\e[92mPYTHON PATH is: $PYTHON_PATH, creating virtual environment\e[39m"
if [ ! -d .venv ]; then
    virtualenv --python=$PYTHON_PATH .venv
fi 
source .venv/bin/activate
echo -e "\e[92mInstalling requirements.txt\e[39m"
pip install -r requirements.txt
cd waiting
echo -e "\e[92mMigrating and creating dummy data\e[39m"
./clean.sh 
