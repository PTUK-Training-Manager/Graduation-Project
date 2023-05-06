import { verify, JwtPayload, Secret } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { Request, Response, NextFunction } from "express";

const verifyResetToken = (req: Request, res: Response, next: NextFunction) => {
  const resetToken = req.cookies["reset-token"];

  if (!resetToken)
    return res.status(401).json({
      success: false,
      message: "No reset token",
      status: 401,
    });

  const secret = process.env.RESET_TOKEN_SECRET as Secret;
  try {
    const decodedPayload = verify(resetToken, secret) as JwtPayload;
    const user = decodedPayload;

    req.user = {
      userId: user.id,
      username: user.username,
      roleId: user.roleId,
    };
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid reset token",
      status: 401,
      error,
    });
  }
};

export default verifyResetToken;
