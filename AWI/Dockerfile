# Étape unique : Utiliser Node pour lancer l'application Angular
FROM node:20

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de dépendances et installer
COPY package.json package-lock.json ./
RUN npm install

# Copier tout le code de l'application dans le conteneur
COPY . .

# Exposer le port par défaut d'Angular (4200)
EXPOSE 4200

# Lancer l'application en mode développement
CMD ["npm", "start:dev"]
