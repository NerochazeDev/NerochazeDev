FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Build the application
RUN npm run build

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose the port the app will run on
EXPOSE 5000

# Command to run the application
CMD ["npm", "run", "start"]