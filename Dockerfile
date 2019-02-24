FROM mhart/alpine-node:11

COPY . /src

WORKDIR /src

RUN ls -al
RUN npm install npm@latest -g
RUN npm install

EXPOSE 8000

CMD ["npm", "start"]