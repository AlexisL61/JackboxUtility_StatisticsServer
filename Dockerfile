FROM node:10.13.0-alpine

WORKDIR /usr/src/app

COPY src/package.json .

RUN npm --prefix src install src

ADD src /usr/src/app

RUN npm --prefix src run tsc

CMD [ "npm", "start" ]
EXPOSE 80