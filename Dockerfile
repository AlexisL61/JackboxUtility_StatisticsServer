FROM node:10.13.0-alpine

WORKDIR /usr/src/app

COPY src/package.json .

RUN npm --prefix app install app

ADD src /usr/src/app

RUN npm --prefix app run tsc

CMD [ "npm", "start" ]
EXPOSE 80