FROM node:20.1.0
# Define build-time arguments
ARG DB_USER
ARG DB_HOST
ARG DB_PORT
ARG DB_NAME
ARG DB_PASS
ARG SECRET_KEY
ARG NODE_PORT
ARG origin

# Set environment variables
ENV DB_USER=${DB_USER}
ENV DB_HOST=${DB_HOST}
ENV DB_PORT=${DB_PORT}
ENV DB_NAME=${DB_NAME}
ENV DB_PASS=${DB_PASS}
ENV SECRET_KEY=${SECRET_KEY}
ENV NODE_PORT=${NODE_PORT}
ENV origin=${origin}

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
