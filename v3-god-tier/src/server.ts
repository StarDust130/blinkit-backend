import "dotenv/config";

import app from "./app.js";

// 🌐 App port
const PORT = process.env.PORT || 5000;

// 🚀 Start backend server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

