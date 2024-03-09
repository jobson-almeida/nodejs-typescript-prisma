FROM node:20-slim

RUN apt update && apt install -y \
    openssl

RUN npm install -g npm@latest
RUN npm install -g npm-check-updates

USER node

WORKDIR /home/node/application

CMD [ "/home/node/application/start.sh" ]
