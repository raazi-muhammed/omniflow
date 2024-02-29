FROM node:21-alpine3.18

WORKDIR /project

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 4005

CMD [ "npm", "run", "dev" ]