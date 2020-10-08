FROM node:14.13.1 as hugo

RUN wget -qO- "https://github.com/gohugoio/hugo/releases/download/v0.72.0/hugo_extended_0.72.0_Linux-64bit.tar.gz" | tar xz \
  && mv hugo /usr/local/bin/hugo \
  && chmod +x /usr/local/bin/hugo

FROM node:14.13.1

COPY --from=hugo /usr/local/bin/hugo /usr/local/bin/hugo

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
