ARG NODE_VERSION=22.0.0
ARG PORT=4200

FROM node:${NODE_VERSION}-alpine

WORKDIR /src

COPY . /src

RUN npm install -g @angular/cli

RUN npm install

EXPOSE ${PORT}

CMD ["npm", "start"]