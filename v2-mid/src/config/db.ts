import prisma from "./prisma"; 

export const connectDB = async (): Promise<void> => {
  try {
    // 🔌 Force Prisma to ping the database right now
    await prisma.$connect();
    console.log("✅ Prisma Connected to PostgreSQL Successfully 🚀");
  } catch (error) {
    console.error("❌ Prisma Database Connection Failed:", error);
    process.exit(1); // Kill the app if the database is dead
  }
};
