FROM ubuntu:18.04
ENV NODE_ENV production
WORKDIR /usr/src/app
RUN apt-get update
RUN apt-get install -y git && apt-get install -y nodejs && apt-get install -y npm
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install 
COPY . .
EXPOSE 3000
CMD npm start