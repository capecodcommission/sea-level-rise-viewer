FROM node:current-alpine as build_deps
WORKDIR /usr/src/app
COPY . ./
# COPY package*.json ./ 
# RUN apk add git && yarn install --force && yarn build
RUN apk add --upgrade --no-cache git && yarn install && yarn build
# RUN npm install
# COPY . .

FROM nginx:stable-alpine
COPY --from=build_deps /usr/src/app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# FROM node:current-alpine
# WORKDIR /app
# COPY . ./
# RUN apk add --no-cache git
# RUN yarn install
# EXPOSE 3000
# CMD ["yarn","start"]