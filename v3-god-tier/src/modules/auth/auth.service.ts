import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { AppError } from "@/shared/errors/app-error.js";

import { createUser, findUserByEmail } from "./auth.repository.js";
import { LoginInput, RegisterInput } from "./auth.types.js";

// 🔐 Register new user
export const registerUser = async (payload: RegisterInput) => {
  // 🔍 Check existing user
  const existingUser = await findUserByEmail(payload.email);

  if (existingUser) {
    throw new AppError("User already exists", 400);
  }

  // 🔒 Hash password
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  // ➕ Create user
  const user = await createUser({
    ...payload,
    password: hashedPassword,
  });

  // 🎟️ Generate JWT token
  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d",
    }
  );

  return {
    user,
    token,
  };
};

// 🔑 Login user
export const loginUser = async (payload: LoginInput) => {
  // 🔍 Find user
  const user = await findUserByEmail(payload.email);

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  // 🔐 Compare password
  const isPasswordValid = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new AppError("Invalid credentials", 401);
  }

  // 🎟️ Generate JWT
  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d",
    }
  );

  return {
    user,
    token,
  };
};

