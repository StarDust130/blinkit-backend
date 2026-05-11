# 🟢 Use official Node.js image
FROM node:22-alpine

# 📂 App folder inside container
WORKDIR /app

# 📦 Copy package files
COPY package*.json ./

# ⚡ Install dependencies
RUN npm install


# 📂 Copy source code
COPY . .

# ⚡ Generate Prisma client
RUN npx prisma generate

# 🏗️ Build TypeScript
RUN npm run build

# 🌐 Expose backend port
EXPOSE 5000

# 🚀 Start production server
CMD ["node", "dist/src/server.js"]

