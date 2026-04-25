# 🚀 Blinkit Backend Setup v1

⚡️ **Ultimate Production-Ready Quickstart**
No fluff, just commands. Let's build! 🛠️

### 1️⃣ Init Project 📦

```bash
mkdir v1-basics && cd v1-basics
npm init -y
```

### 2️⃣ Install Core 🧠

```bash
npm i express cors dotenv pg
```

### 3️⃣ Install Dev Tools 🛠️

```bash
npm i -D typescript nodemon ts-node @types/node @types/express
```

### 4️⃣ Setup TypeScript 📘

```bash
npx tsc --init
```

### 5️⃣ Scaffold Architecture 🏗️

```bash
mkdir -p src/{config,controllers,routes,types,utils}
touch src/config/db.ts src/controllers/{user,product,order}.controller.ts src/routes/{user,product,order}.routes.ts src/types/index.ts src/utils/error.ts src/app.ts src/server.ts .env
```

### 6️⃣ Run It 🔥

```bash
npm run dev
```
