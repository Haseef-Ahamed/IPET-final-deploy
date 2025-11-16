# Use official Node.js runtime as base
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install --production

# Copy app source
COPY . .

# Create upload folder
RUN mkdir -p uploads

# Expose API port
EXPOSE 5000

# Start API server
CMD ["node", "app.js"]
