#!/bin/bash

npm install

npx prisma migrate dev --name create-database

npm start

tail -f /dev/null