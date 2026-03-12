import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { success, error, requireAuth } from "@/lib/api-helpers";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  try {
    const selfTapeRequest = await prisma.selfTapeRequest.findUnique({
      where: { id: params.id },
      include: {
        breakdown: { select: { id: true, roleName: true, projectId: true } },
        submission: {
          include: {
            roleProfile: {
              include: {
                user: { select: { name: true, avatarUrl: true } },
              },
            },
          },
        },
      },
    });

    if (!selfTapeRequest) return error("Self-tape request not found", 404);
    return success(selfTapeRequest);
  } catch (e) {
    return error("Failed to fetch self-tape request", 500);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  try {
    const body = await req.json();
    const updateData: Record<string, unknown> = {};

    if (body.instructions !== undefined) updateData.instructions = body.instructions;
    if (body.scriptSideUrl !== undefined) updateData.scriptSideUrl = body.scriptSideUrl;
    if (body.deadline !== undefined) updateData.deadline = new Date(body.deadline);
    if (body.maxDuration !== undefined) updateData.maxDuration = body.maxDuration;

    const selfTapeRequest = await prisma.selfTapeRequest.update({
      where: { id: params.id },
      data: updateData,
    });

    return success(selfTapeRequest);
  } catch (e) {
    return error("Failed to update self-tape request", 500);
  }
}
