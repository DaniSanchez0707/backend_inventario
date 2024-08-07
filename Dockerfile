FROM node:20-alpine

RUN apk update && apk upgrade && apk add --no-cache git

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install --production && npm cache clean --force

COPY ./ /usr/src/app


CMD ["npm", "start"]
