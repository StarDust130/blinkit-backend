# 🟢 Use official Node.js image
FROM node:22-slim

# 📂 App folder inside container
WORKDIR /app

# 📦 Copy package files first
COPY package*.json ./

# ⚡ Install dependencies
RUN npm install

# 📂 Copy all source code
COPY . .

# 🏗️ Build TypeScript
RUN npm run build

# 🌐 App port
EXPOSE 5000

# 🚀 Start production server
CMD ["node", "dist/server.js"]

