# Base image
FROM node:16

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all files
COPY . .

# Build React app
RUN npm run build

# Install a static server to serve the build
RUN npm install -g serve

# Expose port 80
EXPOSE 80

# Start the app on port 80
CMD ["serve", "-s", "build", "-l", "80"]
