import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { success, error } from "@/lib/api-helpers";

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token || typeof token !== "string") {
      return error("Invalid reset token", 400);
    }

    if (!password || typeof password !== "string" || password.length < 8) {
      return error("Password must be at least 8 characters", 422);
    }

    // Find the token
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetToken) {
      return error("Invalid or expired reset link. Please request a new one.", 400);
    }

    // Check expiry
    if (resetToken.expiresAt < new Date()) {
      // Clean up expired token
      await prisma.passwordResetToken.delete({ where: { id: resetToken.id } });
      return error("Reset link has expired. Please request a new one.", 400);
    }

    // Hash the new password
    const passwordHash = await bcrypt.hash(password, 12);

    // Update user password and delete the token in a transaction
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: resetToken.userId },
        data: { passwordHash },
      });

      await tx.passwordResetToken.delete({
        where: { id: resetToken.id },
      });
    });

    return success({ message: "Password has been reset successfully." });
  } catch (e) {
    console.error("Reset password error:", e);
    return error("Failed to reset password. Please try again.", 500);
  }
}
