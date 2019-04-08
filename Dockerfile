FROM node:current-alpine
WORKDIR /app
COPY . ./
RUN apk add --no-cache git
RUN yarn install
EXPOSE 3000
CMD ["yarn","start"]