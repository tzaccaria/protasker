# Étape 1 : Construire l'application avec Node.js
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
