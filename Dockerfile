FROM node:18.17.0-alpine

WORKDIR /usr/src/app

RUN npm install

RUN npm run build

CMD [ "npm", "start" ]
EXPOSE 80