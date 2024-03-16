FROM node:21-alpine3.18

WORKDIR /module

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 4020

CMD [ "npm", "run", "dev" ]