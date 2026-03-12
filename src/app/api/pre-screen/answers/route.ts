import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { success, error, requireAuth, getSearchParams } from "@/lib/api-helpers";

export async function POST(req: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  try {
    const { applicationId, answers } = await req.json();

    if (!applicationId || !answers || !Array.isArray(answers) || answers.length === 0) {
      return error("applicationId and an array of answers are required", 400);
    }

    // Verify application exists
    const application = await prisma.application.findUnique({ where: { id: applicationId } });
    if (!application) return error("Application not found", 404);

    const created = await prisma.preScreenAnswer.createMany({
      data: answers.map((a: { questionId: string; answer: string }) => ({
        questionId: a.questionId,
        applicationId,
        answer: a.answer,
      })),
    });

    // Fetch back the created answers
    const result = await prisma.preScreenAnswer.findMany({
      where: { applicationId },
      orderBy: { createdAt: "asc" },
    });

    return success(result, 201);
  } catch (e) {
    return error("Failed to submit pre-screen answers", 500);
  }
}

export async function GET(req: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  const { applicationId } = getSearchParams(req);
  if (!applicationId) return error("applicationId query param is required", 400);

  try {
    const answers = await prisma.preScreenAnswer.findMany({
      where: { applicationId },
      orderBy: { createdAt: "asc" },
    });

    return success(answers);
  } catch (e) {
    return error("Failed to fetch pre-screen answers", 500);
  }
}
