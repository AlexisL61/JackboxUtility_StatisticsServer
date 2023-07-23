FROM node:18.17.0-alpine

WORKDIR /usr/src/app

COPY src .

RUN npm install

ADD src /usr/src/app

RUN npm run build

CMD [ "npm", "start" ]
EXPOSE 80