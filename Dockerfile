# Usa la imagen base de Node.js
FROM node:20-alpine

# Actualiza el sistema e instala git
RUN apk update && apk upgrade && apk add --no-cache git

# Crea el directorio de trabajo
WORKDIR /usr/src/app

# Copia package.json al contenedor
COPY package.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código al contenedor
COPY . .

# Define el comando de inicio
CMD ["npm", "start"]
