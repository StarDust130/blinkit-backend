
import { prisma } from "@/infrastructure/db/prisma.js";

import { RegisterInput } from "./auth.types.js";

// 🔍 Find user by email
export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

// ➕ Create new user
export const createUser = async (
  data: RegisterInput & { password: string }
) => {
  return prisma.user.create({
    data,
  });
};

// 🔍 Find user by email or phone
export const findUserByIdentifier = async (
  identifier: string
) => {
  return prisma.user.findFirst({
    where: {
      OR: [
        { email: identifier },
        { phone: identifier },
      ],
    },
  });
};

