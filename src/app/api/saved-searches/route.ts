import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { success, error, requireAuth } from "@/lib/api-helpers";

export async function GET() {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const userId = (auth.session!.user as any).id;

  try {
    const searches = await prisma.savedSearch.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return success(searches);
  } catch (e) {
    return error("Failed to fetch saved searches", 500);
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const userId = (auth.session!.user as any).id;

  try {
    const { name, filters, alertFreq } = await req.json();

    if (!name || !filters) {
      return error("Name and filters are required", 400);
    }

    const validFreqs = ["none", "instant", "daily", "weekly"];
    if (alertFreq && !validFreqs.includes(alertFreq)) {
      return error("Invalid alert frequency", 400);
    }

    const savedSearch = await prisma.savedSearch.create({
      data: {
        userId,
        name,
        filters,
        alertFreq: alertFreq || "none",
      },
    });

    return success(savedSearch, 201);
  } catch (e) {
    return error("Failed to create saved search", 500);
  }
}
