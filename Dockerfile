FROM mhart/alpine-node:11

COPY . /src

WORKDIR /src

RUN npm install

EXPOSE 8000

CMD ["npm", "start"]