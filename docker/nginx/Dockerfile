FROM node:lts-alpine3.12 as build

WORKDIR /frontend
COPY ./frontend/app/package.json ./
COPY ./frontend/app/yarn.lock ./
RUN yarn install
COPY ./frontend/app/ ./
RUN yarn build


FROM nginx:1.18.0-alpine

COPY ./webserver/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /frontend/build /usr/share/nginx/html