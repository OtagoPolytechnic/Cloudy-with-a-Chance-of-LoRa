# Use an official Node.js runtime as a parent image
FROM node:20.13.1

# Set the working directory in the container
WORKDIR /Cloudy-with-a-Chance-of-LoRa/fullstack

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install production and development dependencies
RUN npm install 

# Copy the rest of the application code
COPY . .

# Build the fullstack application
RUN npm run build

# Expose the port for the application (e.g., 3000)
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]