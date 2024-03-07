FROM node:21-alpine3.18

WORKDIR /api-doc

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 4015

CMD [ "npm", "run", "dev" ]