# Usa la imagen base de Node.js
FROM node:18

# Crea el directorio de la aplicación
WORKDIR /usr/src/app

# Copia los archivos de la aplicación
COPY package*.json ./
COPY . .

# Instala las dependencias
RUN npm install

# Expon el puerto
EXPOSE 4000

# Define las variables de entorno
ENV DB_USER=$DB_USER
ENV DB_HOST=$DB_HOST
ENV DB_NAME=$DB_NAME
ENV DB_PASS=$DB_PASS
ENV DB_PORT=$DB_PORT
ENV NODE_PORT=$NODE_PORT
ENV origin=$origin
ENV SECRET_KEY=$SECRET_KEY

# Ejecuta la aplicación
CMD ["npm", "run", "dev"]
