FROM node:21-alpine3.18

WORKDIR /communication

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 4025

EXPOSE 4040

CMD [ "npm", "run", "dev" ]