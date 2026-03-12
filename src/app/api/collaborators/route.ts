import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { success, error, requireAuth, getSearchParams } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  const { projectId } = getSearchParams(req);
  if (!projectId) return error("projectId query param is required", 400);

  try {
    const collaborators = await prisma.collaborator.findMany({
      where: { projectId },
      orderBy: { createdAt: "desc" },
    });

    return success(collaborators);
  } catch (e) {
    return error("Failed to fetch collaborators", 500);
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const invitedByUserId = (auth.session!.user as any).id;

  try {
    const { projectId, userId, accessLevel } = await req.json();

    if (!projectId || !userId) {
      return error("projectId and userId are required", 400);
    }

    const validLevels = ["full", "shortlist_only"];
    if (accessLevel && !validLevels.includes(accessLevel)) {
      return error("Invalid access level. Must be 'full' or 'shortlist_only'", 400);
    }

    // Verify project exists
    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) return error("Project not found", 404);

    const collaborator = await prisma.collaborator.create({
      data: {
        projectId,
        userId,
        accessLevel: accessLevel || "shortlist_only",
        invitedByUserId,
      },
    });

    return success(collaborator, 201);
  } catch (e: any) {
    if (e?.code === "P2002") return error("User is already a collaborator on this project", 409);
    return error("Failed to add collaborator", 500);
  }
}

export async function DELETE(req: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  const { projectId, userId } = getSearchParams(req);
  if (!projectId || !userId) {
    return error("projectId and userId query params are required", 400);
  }

  try {
    await prisma.collaborator.delete({
      where: { projectId_userId: { projectId, userId } },
    });

    return success({ removed: true });
  } catch (e) {
    return error("Failed to remove collaborator", 500);
  }
}
