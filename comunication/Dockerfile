FROM node:21-alpine3.18

WORKDIR /comunication

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 4025

CMD [ "npm", "run", "dev" ]