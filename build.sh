#!/bin/bash

source ../../bash-helpers.sh
PROJECT_ID=$(getProjectId)

if [[ $? -ne 0 ]]; then
  echo $PROJECT_ID
  exit 1
fi

docker build --build-arg EXTERNAL_USER=$USER --build-arg EXTERNAL_UID=$UID -t ${PROJECT_ID}-db:dev .