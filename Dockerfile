FROM node:20-alpine

RUN apk update && apk upgrade && apk add --no-cache git

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "start" ]
