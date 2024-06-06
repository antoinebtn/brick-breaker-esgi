FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install


COPY . .

# Build the frontend
RUN npm run build

# Install a simple HTTP server
RUN npm install -g serve

# Start the server to serve the built files
CMD ["serve", "-s", "."]