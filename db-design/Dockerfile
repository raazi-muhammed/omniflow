FROM node:21-alpine3.18

WORKDIR /db-design

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 4030

CMD [ "npm", "run", "dev" ]