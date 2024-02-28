FROM node:21-alpine3.18

WORKDIR /auth

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "npm", "run", "dev" ]