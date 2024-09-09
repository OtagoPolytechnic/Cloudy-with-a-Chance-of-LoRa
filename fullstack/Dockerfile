# frontend/Dockerfile
# Use an official Node.js runtime as a parent image
FROM node:20.13.1

# Set the working directory in the container
WORKDIR /Cloudy-with-a-Chance-of-LoRa/frontend

# Copy the package.json and package-lock.json files
COPY /package*.json ./

# Install NVM and Node.js
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash && \
    export NVM_DIR="$HOME/.nvm" && \
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && \
    nvm install 20.13.1 && \
    nvm use 20.13.1 && \
    nvm alias default 20.13.1
    
# Copy the rest of the application code
COPY . .

# Build the frontend application
RUN npm run build

# Install a lightweight HTTP server to serve the build
RUN npm install -g serve

EXPOSE 80
EXPOSE 443

CMD ["serve", "-s", "build", "-l", "42335"]