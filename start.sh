#!/bin/bash

# Check if NODE_ENV is set
if [ -z "$NODE_ENV" ]; then
    export NODE_ENV=development
fi

if [ "$NODE_ENV" == "development" ]; then
    yarn run swagger
fi

cp .env.$NODE_ENV .env

[ ! -d /home/node/.cache/puppeteer/ ] && node /home/node/app/node_modules/puppeteer/install.js

yarn run dev:start
