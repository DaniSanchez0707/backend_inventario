# Usa la imagen base de Node.js con Alpine Linux
FROM node:20-alpine

# Actualiza el índice de paquetes y actualiza los paquetes existentes
RUN apk update && apk upgrade && apk add --no-cache git

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json (si está disponible)
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/ 

# Instala las dependencias de producción
RUN npm install --production && npm cache clean --force

# Copia el resto de la aplicación al directorio de trabajo
COPY ./ /usr/src/app

# Exponer el puerto 80 (puedes cambiar esto si tu aplicación usa otro puerto)
EXPOSE 80

# Comando para iniciar la aplicación
CMD ["npm", "start"]
