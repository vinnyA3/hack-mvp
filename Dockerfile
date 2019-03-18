FROM alpine:latest

ADD . /code

WORKDIR /code

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 3000
