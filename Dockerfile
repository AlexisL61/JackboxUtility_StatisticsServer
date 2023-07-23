FROM node:10.13.0-alpine

WORKDIR /usr/src/app

COPY src/package.json .

RUN npm --prefix src install src

ADD src /usr/src/app

RUN npm run build

CMD [ "npm", "start" ]
EXPOSE 80