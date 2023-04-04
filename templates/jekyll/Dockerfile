# Use Alpine Linux as our base image so that we minimize the overall size our final container, and minimize the surface area of packages that could be out of date.
FROM ruby:2.6.9-alpine3.15 as builder

# Config
ENV RUBY_VER=2.6.9
ENV GLIBC_VER=2.28-r0
ENV BUNDLER_VER=2.4.7
ENV JEKYLL_VER=4.1.1

# Build dependencies
RUN echo "http://dl-cdn.alpinelinux.org/alpine/edge/main" > /etc/apk/repositories \
  && echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
  && echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories \
  && echo "http://dl-cdn.alpinelinux.org/alpine/v3.11/main" >> /etc/apk/repositories \
  && apk upgrade -U -a \
  && apk add --no-cache \
  autoconf \
  automake \
  bash \
  build-base \
  ca-certificates \
  curl \
  freetype \
  g++ \
  gcc \
  git \
  harfbuzz \
  make \
  nasm \
  nss \
  openssh-client \
  pkgconfig \
  ttf-freefont \
  && rm -rf /var/cache/* \
  && mkdir /var/cache/apk
RUN apk add --update nodejs npm

# Install glibc: This is required for SASS to work.
RUN wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub \
  && wget "https://github.com/sgerrand/alpine-pkg-glibc/releases/download/$GLIBC_VER/glibc-$GLIBC_VER.apk" \
  && apk --no-cache add --force-overwrite "glibc-$GLIBC_VER.apk" \
  && rm "glibc-$GLIBC_VER.apk" \
  && wget "https://github.com/sgerrand/alpine-pkg-glibc/releases/download/$GLIBC_VER/glibc-bin-$GLIBC_VER.apk" \
  && apk --no-cache add --force-overwrite "glibc-bin-$GLIBC_VER.apk" \
  && rm "glibc-bin-$GLIBC_VER.apk" \
  && wget "https://github.com/sgerrand/alpine-pkg-glibc/releases/download/$GLIBC_VER/glibc-i18n-$GLIBC_VER.apk" \
  && apk --no-cache add --force-overwrite "glibc-i18n-$GLIBC_VER.apk" \
  && rm "glibc-i18n-$GLIBC_VER.apk"
RUN apk add --force-overwrite alpine-baselayout-data

# Install bundler and jekyll
RUN gem install bundler:$BUNDLER_VER
RUN gem install jekyll -v $JEKYLL_VER

# Install gems
WORKDIR /app
COPY Gemfile /app/
COPY Gemfile.lock /app/
RUN bundle config --global jobs 4
RUN bundle config build.nokogiri --use-system-libraries
RUN bundle install
