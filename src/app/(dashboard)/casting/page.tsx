"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlusIcon, StarIcon, ClockIcon, UserGroupIcon } from "@heroicons/react/24/outline";

const sampleBreakdowns = [
  { id: 1, roleName: "Lead Detective", project: "Midnight Runner", ageRange: "35-45", gender: "Male", compensation: "$5,000/week", submissions: 24, deadline: "Mar 25, 2026", status: "OPEN" },
  { id: 2, roleName: "Mysterious Neighbor", project: "Midnight Runner", ageRange: "50-65", gender: "Any", compensation: "$2,500/week", submissions: 12, deadline: "Mar 30, 2026", status: "OPEN" },
  { id: 3, roleName: "Young Reporter", project: "City Pulse", ageRange: "22-28", gender: "Female", compensation: "$3,000/week", submissions: 38, deadline: "Apr 5, 2026", status: "OPEN" },
];

export default function CastingPage() {
  const [activeTab, setActiveTab] = useState("breakdowns");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Casting</h1>
          <p className="text-sm text-zinc-400 mt-1">Manage casting breakdowns, submissions, and auditions.</p>
        </div>
        <Button className="gap-2">
          <PlusIcon className="h-4 w-4" />
          New Breakdown
        </Button>
      </div>

      <div className="flex gap-1 rounded-lg bg-zinc-900/50 p-1 border border-zinc-800 w-fit">
        {["breakdowns", "my-submissions", "auditions"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
              activeTab === tab ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            {tab.replace("-", " ")}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {sampleBreakdowns.map((b) => (
          <Card key={b.id} variant="interactive" className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-white">{b.roleName}</h3>
                  <Badge variant="success" size="sm">{b.status}</Badge>
                </div>
                <p className="text-sm text-indigo-400 mt-1">{b.project}</p>
                <div className="flex items-center gap-4 mt-3 text-sm text-zinc-400">
                  <span>Age: {b.ageRange}</span>
                  <span>Gender: {b.gender}</span>
                  <span>{b.compensation}</span>
                </div>
              </div>
              <div className="text-right space-y-2">
                <div className="flex items-center gap-1.5 text-sm text-zinc-400">
                  <UserGroupIcon className="h-4 w-4" />
                  {b.submissions} submissions
                </div>
                <div className="flex items-center gap-1.5 text-sm text-zinc-400">
                  <ClockIcon className="h-4 w-4" />
                  Due {b.deadline}
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="primary" size="sm">View Submissions</Button>
              <Button variant="outline" size="sm">Edit Breakdown</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
