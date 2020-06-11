FROM node:12.6.0-alpine as builder

# Get the necessary build tools
RUN apk upgrade -U -a \
  && apk add --no-cache \
  autoconf \
  automake \
  build-base \
  libtool \
  nasm \
  pkgconfig \
  && rm -rf /var/cache/* \
  && mkdir /var/cache/apk

# install dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install --silent

# Get a clean image with gatsby-cli and the pre-built node modules
FROM node:12.6.0-alpine
RUN npm i -g @11ty/eleventy
COPY --from=builder /app/node_modules /app/node_modules