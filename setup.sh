#!/bin/bash


vercomp () {
    if [[ $1 == $2 ]]
    then
        return 0
    fi
    local IFS=.
    local i ver1=($1) ver2=($2)
    # fill empty fields in ver1 with zeros
    for ((i=${#ver1[@]}; i<${#ver2[@]}; i++))
    do
        ver1[i]=0
    done
    for ((i=0; i<${#ver1[@]}; i++))
    do
        if [[ -z ${ver2[i]} ]]
        then
            # fill empty fields in ver2 with zeros
            ver2[i]=0
        fi
        if ((10#${ver1[i]} > 10#${ver2[i]}))
        then
            return 1
        fi
        if ((10#${ver1[i]} < 10#${ver2[i]}))
        then
            return 2
        fi
    done
    return 0
}



# get filepath of project root dir
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $DIR

# install dependencies
sudo apt install npm python3.8 libpq-dev python3-pip virtualenv python3.8-dev
cd front-end

# check npm version
currentver_npm="$(npm -v)"
requiredver_npm="6.10.0"
vercomp  $currentver_npm $requiredver_npm 
if [ $? == 2 ]; then
    echo -e "\e[31mThe minimum npm version requirement is 6.1.0, please upgrade your npm version and try again.\e[39m"
    exit 1
else
    echo -e "\e[92mnpm requirements met. Continuing..\e[39m"
fi

# check node version
currentver_node="$(node -v)"
requiredver_node="10.00.0"
# remove initial 'v' from node version
currentver_node=${currentver_node:1}
vercomp  $currentver_node $requiredver_node 
if [ $? == 2 ]; then
    echo -e "\e[31mThe minimum npm version requirement is 10.0.0, please upgrade your node version and try again.\e[39m"
    exit 1
else
    echo -e "\e[92mnode requirements met. Continuing..\e[39m"
fi

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
