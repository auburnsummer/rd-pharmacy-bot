FROM node:alpine3.13

COPY . /src

WORKDIR /src

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

RUN npm install --no-package-lock

EXPOSE 8000

CMD ["npm", "start"]