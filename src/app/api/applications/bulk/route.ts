import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { success, error, requireAuth } from "@/lib/api-helpers";

export async function POST(req: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const userId = (auth.session!.user as any).id;

  try {
    const { action, applicationIds } = await req.json();

    if (!action || !applicationIds || !Array.isArray(applicationIds) || applicationIds.length === 0) {
      return error("action and a non-empty applicationIds array are required", 400);
    }

    const validActions = ["shortlist", "reject", "message"];
    if (!validActions.includes(action)) {
      return error("Invalid action. Must be 'shortlist', 'reject', or 'message'", 400);
    }

    if (action === "shortlist") {
      await prisma.application.updateMany({
        where: { id: { in: applicationIds } },
        data: { status: "SHORTLISTED" },
      });

      await prisma.auditEvent.createMany({
        data: applicationIds.map((id: string) => ({
          actorUserId: userId,
          entityType: "application",
          entityId: id,
          action: "bulk_shortlisted",
        })),
      });

      return success({ action: "shortlist", count: applicationIds.length });
    }

    if (action === "reject") {
      await prisma.application.updateMany({
        where: { id: { in: applicationIds } },
        data: { status: "REJECTED" },
      });

      await prisma.auditEvent.createMany({
        data: applicationIds.map((id: string) => ({
          actorUserId: userId,
          entityType: "application",
          entityId: id,
          action: "bulk_rejected",
        })),
      });

      return success({ action: "reject", count: applicationIds.length });
    }

    if (action === "message") {
      // For messaging, we return the application details so the frontend can compose messages
      const applications = await prisma.application.findMany({
        where: { id: { in: applicationIds } },
        include: {
          roleProfile: {
            include: {
              user: { select: { id: true, name: true, email: true } },
            },
          },
        },
      });

      const recipients = applications.map((app) => ({
        applicationId: app.id,
        userId: app.roleProfile.user.id,
        name: app.roleProfile.user.name,
      }));

      return success({ action: "message", recipients });
    }

    return error("Unhandled action", 400);
  } catch (e) {
    return error("Failed to perform bulk action", 500);
  }
}
