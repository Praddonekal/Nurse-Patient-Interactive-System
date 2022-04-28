FROM node:latest

ENV MONGO_DB_USERNAME=admin \
   MONGO_DB_PWD=password

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

CMD [ "npm", "start" ]