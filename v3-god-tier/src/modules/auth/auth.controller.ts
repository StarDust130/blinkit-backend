import { Request, Response } from "express";

export const AuthController = {
  login: async (req: Request, res: Response) => {
    res.json({ message: "login placeholder" });
  },
};
