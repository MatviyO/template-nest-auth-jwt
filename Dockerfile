FROM node:12.13-alpha

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

COPY ./dist ./dist

CMD ["npm", "run", "start:dev"]
