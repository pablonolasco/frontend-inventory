FROM node:12-alpine
WORKDIR /code
#RUN npm install -g @angular/cli
RUN npm install -g @angular/cli@13

COPY package*.json ./
RUN npm install

#1 comentar y ejecutar comando  docker-compose run app ng new front-inventory --directory . --skipInstall para crear proyeccto
#COPY package*.json ./
#RUN npm install
#
#2 descomentar lo del paso 1 y ejecutar el comando docker-compose up --build
#
#3 para el comando de arriba y ejecutar el comando docker-compose up para  que reconozca los elementos nuevos
#

#https://www.arundhaj.com/blog/how-to-run-angular-using-docker-without-installing-node-host-machine.html
