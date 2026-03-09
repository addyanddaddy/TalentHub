import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Creating test accounts...\n");

  const password = await bcrypt.hash("FrameOne2026!", 12);

  // Account 1: Producer (Ralph)
  const ralph = await prisma.user.upsert({
    where: { email: "ralph@frameone.io" },
    update: {},
    create: {
      email: "ralph@frameone.io",
      name: "Ralph Martinez",
      passwordHash: password,
    },
  });

  const ralphAccount = await prisma.account.upsert({
    where: { id: ralph.id + "-account" },
    update: {},
    create: {
      id: ralph.id + "-account",
      type: "INDIVIDUAL",
      name: "Ralph Martinez",
      billingOwnerUserId: ralph.id,
    },
  });

  await prisma.membership.upsert({
    where: { id: ralph.id + "-membership" },
    update: {},
    create: {
      id: ralph.id + "-membership",
      accountId: ralphAccount.id,
      tier: "HIRING_PRO",
      status: "ACTIVE",
    },
  });

  const producerRole = await prisma.role.findUnique({ where: { slug: "producer" } });
  const directorRole = await prisma.role.findUnique({ where: { slug: "director" } });

  if (producerRole) {
    await prisma.roleProfile.upsert({
      where: { userId_roleId: { userId: ralph.id, roleId: producerRole.id } },
      update: {},
      create: {
        userId: ralph.id,
        roleId: producerRole.id,
        displayName: "Ralph Martinez",
        bio: "Award-winning producer with 15 years in independent film. Produced 12 features and 30+ commercials. Based in Los Angeles. Passionate about discovering new talent and building efficient production teams.",
        city: "Los Angeles",
        region: "California",
        country: "United States",
        yearsExperience: 15,
      },
    });
  }

  console.log("  ✓ Ralph Martinez (Producer) — ralph@frameone.io");

  // Account 2: Shapur (Director/DP)
  const shapur = await prisma.user.upsert({
    where: { email: "shapur@frameone.io" },
    update: {},
    create: {
      email: "shapur@frameone.io",
      name: "Shapur Ahmadi",
      passwordHash: password,
    },
  });

  const shapurAccount = await prisma.account.upsert({
    where: { id: shapur.id + "-account" },
    update: {},
    create: {
      id: shapur.id + "-account",
      type: "INDIVIDUAL",
      name: "Shapur Ahmadi",
      billingOwnerUserId: shapur.id,
    },
  });

  await prisma.membership.upsert({
    where: { id: shapur.id + "-membership" },
    update: {},
    create: {
      id: shapur.id + "-membership",
      accountId: shapurAccount.id,
      tier: "HIRING_PRO",
      status: "ACTIVE",
    },
  });

  if (directorRole) {
    await prisma.roleProfile.upsert({
      where: { userId_roleId: { userId: shapur.id, roleId: directorRole.id } },
      update: {},
      create: {
        userId: shapur.id,
        roleId: directorRole.id,
        displayName: "Shapur Ahmadi",
        bio: "Director and visual storyteller specializing in drama and thriller. Known for strong performances and atmospheric cinematography. Based in the Bay Area with projects across California.",
        city: "San Francisco",
        region: "California",
        country: "United States",
        yearsExperience: 10,
      },
    });
  }

  console.log("  ✓ Shapur Ahmadi (Director) — shapur@frameone.io");

  // Account 3: Brandon (Admin/Multi-role)
  const brandon = await prisma.user.upsert({
    where: { email: "brandon@frameone.io" },
    update: {},
    create: {
      email: "brandon@frameone.io",
      name: "Brandon Bible",
      passwordHash: password,
    },
  });

  const brandonAccount = await prisma.account.upsert({
    where: { id: brandon.id + "-account" },
    update: {},
    create: {
      id: brandon.id + "-account",
      type: "INDIVIDUAL",
      name: "Brandon Bible",
      billingOwnerUserId: brandon.id,
    },
  });

  await prisma.membership.upsert({
    where: { id: brandon.id + "-membership" },
    update: {},
    create: {
      id: brandon.id + "-membership",
      accountId: brandonAccount.id,
      tier: "AGENCY_STUDIO",
      status: "ACTIVE",
    },
  });

  const lineProducerRole = await prisma.role.findUnique({ where: { slug: "line-producer" } });

  if (lineProducerRole) {
    await prisma.roleProfile.upsert({
      where: { userId_roleId: { userId: brandon.id, roleId: lineProducerRole.id } },
      update: {},
      create: {
        userId: brandon.id,
        roleId: lineProducerRole.id,
        displayName: "Brandon Bible",
        bio: "Technical lead and line producer. Expert in production workflow optimization and platform development. Building the future of entertainment industry networking.",
        city: "Los Angeles",
        region: "California",
        country: "United States",
        yearsExperience: 8,
      },
    });
  }

  console.log("  ✓ Brandon Bible (Line Producer) — brandon@frameone.io");

  // Demo account
  const demo = await prisma.user.upsert({
    where: { email: "demo@frameone.io" },
    update: {},
    create: {
      email: "demo@frameone.io",
      name: "Demo User",
      passwordHash: password,
    },
  });

  const demoAccount = await prisma.account.upsert({
    where: { id: demo.id + "-account" },
    update: {},
    create: {
      id: demo.id + "-account",
      type: "INDIVIDUAL",
      name: "Demo User",
      billingOwnerUserId: demo.id,
    },
  });

  await prisma.membership.upsert({
    where: { id: demo.id + "-membership" },
    update: {},
    create: {
      id: demo.id + "-membership",
      accountId: demoAccount.id,
      tier: "FREE",
      status: "ACTIVE",
    },
  });

  const dpRole = await prisma.role.findUnique({ where: { slug: "director-of-photography" } });
  const editorRole = await prisma.role.findUnique({ where: { slug: "editor" } });

  if (dpRole) {
    await prisma.roleProfile.upsert({
      where: { userId_roleId: { userId: demo.id, roleId: dpRole.id } },
      update: {},
      create: {
        userId: demo.id,
        roleId: dpRole.id,
        displayName: "Demo User",
        bio: "Experienced DP with a background in indie features and music videos. ARRI and RED certified. Available for projects in the greater LA area.",
        city: "Los Angeles",
        region: "California",
        country: "United States",
        yearsExperience: 5,
      },
    });
  }

  if (editorRole) {
    await prisma.roleProfile.upsert({
      where: { userId_roleId: { userId: demo.id, roleId: editorRole.id } },
      update: {},
      create: {
        userId: demo.id,
        roleId: editorRole.id,
        displayName: "Demo User",
        bio: "Editor working in Avid and DaVinci Resolve. Specialize in narrative features and documentary. Fast turnaround with attention to story pacing.",
        city: "Los Angeles",
        region: "California",
        country: "United States",
        yearsExperience: 5,
      },
    });
  }

  console.log("  ✓ Demo User (DP + Editor) — demo@frameone.io");

  console.log("\n✅ All test accounts created.");
  console.log("\nLogin credentials for all accounts:");
  console.log("  Password: FrameOne2026!");
  console.log("\n  ralph@frameone.io    — Producer (Hiring Pro tier)");
  console.log("  shapur@frameone.io   — Director (Hiring Pro tier)");
  console.log("  brandon@frameone.io  — Line Producer (Agency tier)");
  console.log("  demo@frameone.io     — DP + Editor (Free tier)");
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
