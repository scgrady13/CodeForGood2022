# pull the base image
FROM node:lts-alpine

# set the working direction
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY frontend/app/package.json ./

COPY frontend/app/yarn.lock ./

RUN yarn

# add app
COPY ./frontend ./frontend

# start app
CMD ["yarn", "start"]