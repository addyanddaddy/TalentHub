import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { success, error, requireAuth, getSearchParams } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  const { requisitionId } = getSearchParams(req);
  if (!requisitionId) return error("requisitionId query param is required", 400);

  try {
    const questions = await prisma.preScreenQuestion.findMany({
      where: { requisitionId },
      orderBy: { sortOrder: "asc" },
    });

    return success(questions);
  } catch (e) {
    return error("Failed to fetch pre-screen questions", 500);
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  try {
    const { requisitionId, questions } = await req.json();

    if (!requisitionId || !questions || !Array.isArray(questions) || questions.length === 0) {
      return error("requisitionId and an array of questions are required", 400);
    }

    // Verify requisition exists
    const requisition = await prisma.requisition.findUnique({ where: { id: requisitionId } });
    if (!requisition) return error("Requisition not found", 404);

    const created = await prisma.preScreenQuestion.createMany({
      data: questions.map(
        (q: { question: string; questionType?: string; options?: unknown; isRequired?: boolean }, i: number) => ({
          requisitionId,
          question: q.question,
          questionType: q.questionType || "text",
          options: q.options || null,
          isRequired: q.isRequired !== undefined ? q.isRequired : true,
          sortOrder: i,
        })
      ),
    });

    // Fetch back the created questions
    const result = await prisma.preScreenQuestion.findMany({
      where: { requisitionId },
      orderBy: { sortOrder: "asc" },
    });

    return success(result, 201);
  } catch (e) {
    return error("Failed to create pre-screen questions", 500);
  }
}
