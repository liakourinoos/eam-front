# Use the latest Node.js LTS version
FROM node:lts

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Install 'serve' globally to run the production build
RUN npm install -g serve

# Copy the rest of the app
COPY . .

# Build the app (optional, if using Vite build before serve)
RUN npm run build


EXPOSE 3000

# Start the app (you should have a "start" script in package.json)
CMD ["npm", "start"]