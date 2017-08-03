FROM node:8
RUN mkdir /reactiverails-docker-demo
WORKDIR /reactiverails-docker-demo
ADD . /reactiverails-docker-demo
RUN npm install