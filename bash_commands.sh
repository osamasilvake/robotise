#!/bin/bash

# This bash script is used to check and update 
# all the dependencies of root and client directories.

RED='\033[0;31m'        # Red
GREEN='\033[0;32m'      # Green
BLUE='\033[0;34m'       # Blue
YELLOW='\033[0;33m'     # Yellow
GREY='\033[0;37m'       # Grey
NC='\033[0m'            # No (reset)

while true; do
    echo -e "${YELLOW}"
    echo -e "------------------------"
    echo -e "Please choose an option:"
    echo -e "------------------------"
    echo -e "00: To check all dependencies current state."
    echo -e "01: To update & install all dependencies."
    echo -e "02: To update & install root dependencies."
    echo -e "03: To update & install client dependencies."
    echo -e "04: To restart the docker containers."

    echo -e "${BLUE}"
    read -p "Do you wish to update all the dependencies?: " option

    case $option in
        "00")
            echo -e "${GREEN}"
            echo -e "----"
            echo -e "Root"
            echo -e "----"
            echo -e "${GREY}"
            ncu

            cd client
            echo -e "${GREEN}"
            echo -e "------"
            echo -e "Client"
            echo -e "------"
            echo -e "${GREY}"
            ncu
            echo -e "${NC}"
            cd ..
            
            echo -e
            break;;
        "01")
            echo -e "${GREEN}"
            echo -e "----"
            echo -e "Root"
            echo -e "----"
            echo -e "${GREY}"
            ncu -u
            rm -R node_modules
            yarn install

            cd client
            echo -e "${GREEN}"
            echo -e "------"
            echo -e "Client"
            echo -e "------"
            echo -e "${GREY}"
            ncu -u
            rm -R node_modules
            yarn install
            cd ..
            
            echo -e
            break;;
        "02")
            echo -e "${GREEN}"
            echo -e "----"
            echo -e "Root"
            echo -e "----"
            echo -e "${GREY}"
            ncu -u
            rm -R node_modules
            yarn install

            echo -e
            break;;
        "03")
            cd client
            echo -e "${GREEN}"
            echo -e "------"
            echo -e "client"
            echo -e "------"
            echo -e "${GREY}"
            ncu -u
            rm -R node_modules
            yarn install
            cd ..

            echo -e
            break;;
        "04")
            docker stop roc-client
            yarn docker:dev

            echo -e
            break;;
        *)
            echo -e "\n${RED}Please choose a correct option: 00, 01, 02, 03, 04!";;
    esac
done