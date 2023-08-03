FROM node:20-slim

RUN apt-get update && apt-get install -y \
    openssl

RUN npm install -g npm@9.8.1

USER node

WORKDIR /home/node/application

CMD [ "/home/node/application/start.sh" ]
