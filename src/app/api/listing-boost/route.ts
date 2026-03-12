import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { success, error, requireAuth } from "@/lib/api-helpers";

export async function POST(req: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  try {
    const { requisitionId, breakdownId, boostType, duration } = await req.json();

    if (!requisitionId && !breakdownId) {
      return error("Either requisitionId or breakdownId is required", 400);
    }

    const validTypes = ["featured", "spotlight", "boost"];
    if (boostType && !validTypes.includes(boostType)) {
      return error("Invalid boost type. Must be 'featured', 'spotlight', or 'boost'", 400);
    }

    if (!duration || typeof duration !== "number" || duration < 1) {
      return error("Duration in days is required and must be a positive number", 400);
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + duration);

    const boost = await prisma.listingBoost.create({
      data: {
        requisitionId: requisitionId || null,
        breakdownId: breakdownId || null,
        boostType: boostType || "featured",
        startDate,
        endDate,
      },
    });

    return success(boost, 201);
  } catch (e) {
    return error("Failed to create listing boost", 500);
  }
}

export async function GET() {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  try {
    const now = new Date();
    const boosts = await prisma.listingBoost.findMany({
      where: {
        endDate: { gte: now },
      },
      orderBy: { endDate: "asc" },
    });

    return success(boosts);
  } catch (e) {
    return error("Failed to fetch active boosts", 500);
  }
}
