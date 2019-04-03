FROM node
WORKDIR /app
COPY . ./
RUN yarn upgrade && yarn
EXPOSE 3000
CMD ["yarn", "start"]