import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { success, error, requireAuth } from "@/lib/api-helpers";

export async function POST(req: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  try {
    const { breakdownId, submissionId, instructions, scriptSideUrl, deadline, maxDuration } =
      await req.json();

    if (!breakdownId || !submissionId || !instructions || !deadline) {
      return error("breakdownId, submissionId, instructions, and deadline are required", 400);
    }

    // Verify breakdown exists
    const breakdown = await prisma.breakdown.findUnique({ where: { id: breakdownId } });
    if (!breakdown) return error("Breakdown not found", 404);

    // Verify submission exists
    const submission = await prisma.submission.findUnique({ where: { id: submissionId } });
    if (!submission) return error("Submission not found", 404);

    const selfTapeRequest = await prisma.selfTapeRequest.create({
      data: {
        breakdownId,
        submissionId,
        instructions,
        scriptSideUrl: scriptSideUrl || null,
        deadline: new Date(deadline),
        maxDuration: maxDuration || null,
      },
    });

    return success(selfTapeRequest, 201);
  } catch (e) {
    return error("Failed to create self-tape request", 500);
  }
}
