FROM node:20-alpine
LABEL authors="leva"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
