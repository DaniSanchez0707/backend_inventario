FROM node:20

# Define build arguments and set default values from environment variables
ARG DB_USER
ARG DB_HOST
ARG DB_NAME
ARG DB_PASS
ARG DB_PORT
ARG NODE_PORT
ARG origin
ARG SECRET_KEY

# Set environment variables to be available during runtime
ENV DB_USER=${DB_USER}
ENV DB_HOST=${DB_HOST}
ENV DB_NAME=${DB_NAME}
ENV DB_PASS=${DB_PASS}
ENV DB_PORT=${DB_PORT}
ENV NODE_PORT=${NODE_PORT}
ENV ORIGIN=${origin}
ENV SECRET_KEY=${SECRET_KEY}

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose port
EXPOSE ${NODE_PORT}

# Start the application
CMD ["npm", "run", "dev"]
