FROM node:21-alpine3.18

WORKDIR /team

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 4010

CMD [ "npm", "run", "dev" ]