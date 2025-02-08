# Base image for building
FROM node:lts-alpine AS builder

WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package.json package-lock.json* ./
RUN npm install --frozen-lockfile

# Copy the rest of the source code
COPY . .

# Build the Vite app
RUN npm run build

# Use a minimal Node.js image for production
FROM node:lts-alpine AS runner

WORKDIR /usr/src/app

# Copy only the necessary files from the builder stage
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

# Expose the port (Vite preview defaults to 4173)
EXPOSE 4173

# Start Vite preview server
CMD ["npm", "run", "preview"]
