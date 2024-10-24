ARG NODE_VERSION=22.0.0

FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli

RUN npm install

COPY . .

RUN npm run build

## Stage 2 (Production)
FROM nginx:1.27.2-alpine

# Copier la configuration Nginx comme template
COPY nginx.conf.template /etc/nginx/nginx.conf.template

# Diagnostic
RUN echo "Port is: $PORT" 

# Remplacer ${PORT} par la valeur réelle de la variable d'environnement

COPY --from=build /usr/src/app/dist/awi /usr/share/nginx/html

# Substituer la variable ${PORT} et afficher sa valeur avant de démarrer Nginx
CMD ["/bin/sh", "-c", "echo 'Le port utilisé est: ${PORT}' && envsubst '${PORT}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"]