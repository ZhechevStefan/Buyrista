FROM node

WORKDIR /backend

COPY . .

RUN npm install

ENV DB_HOST=database
ENV DB_USER=postgres
ENV DB_PASSWORD=levski1914
ENV DB_NAME=buyrista
ENV JWT_KEY=hmvWoialKfjwiOtuM

EXPOSE 5000

