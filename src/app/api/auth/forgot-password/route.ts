import { NextRequest } from "next/server";
import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";
import { success } from "@/lib/api-helpers";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      // Still return 200 to not reveal anything
      return success({ message: "If an account exists with that email, we've sent a password reset link." });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (user) {
      // Delete any existing tokens for this user
      await prisma.passwordResetToken.deleteMany({
        where: { userId: user.id },
      });

      // Generate a secure random token
      const token = randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      await prisma.passwordResetToken.create({
        data: {
          userId: user.id,
          token,
          expiresAt,
        },
      });

      // Log the reset URL (no email sending yet)
      const resetUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/auth/reset-password?token=${token}`;
      console.log(`[Password Reset] Reset link for ${user.email}: ${resetUrl}`);
    }

    // Always return success regardless of whether user exists
    return success({ message: "If an account exists with that email, we've sent a password reset link." });
  } catch (e) {
    console.error("Forgot password error:", e);
    // Still return 200 to not reveal anything
    return success({ message: "If an account exists with that email, we've sent a password reset link." });
  }
}
