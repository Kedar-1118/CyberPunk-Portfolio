# Use official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
# Using --production to skip devDependencies (nodemon)
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the API port
EXPOSE 5000

# Define environment variables (Can be overridden at runtime)
# Providing defaults for safety
ENV PORT=5000
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]
