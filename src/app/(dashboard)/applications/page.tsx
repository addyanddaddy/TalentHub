"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BriefcaseIcon } from "@heroicons/react/24/outline";

const statusColors: Record<string, "default" | "primary" | "success" | "warning" | "danger"> = {
  SUBMITTED: "primary",
  UNDER_REVIEW: "warning",
  SHORTLISTED: "success",
  REJECTED: "danger",
  WITHDRAWN: "default",
};

const sampleApplications = [
  { id: 1, role: "Director of Photography", project: "Midnight Runner", status: "UNDER_REVIEW", appliedDate: "Mar 5, 2026", rate: "$800/day" },
  { id: 2, role: "Camera Operator", project: "City Pulse", status: "SUBMITTED", appliedDate: "Mar 7, 2026", rate: "$550/day" },
  { id: 3, role: "DP", project: "Desert Bloom", status: "SHORTLISTED", appliedDate: "Feb 28, 2026", rate: "$900/day" },
];

export default function ApplicationsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">My Applications</h1>
        <p className="text-sm text-navy-200 mt-1">Track your job applications and their status.</p>
      </div>

      {sampleApplications.length === 0 ? (
        <div className="rounded-xl border border-dashed border-navy-700 bg-navy-900/30 p-16 text-center">
          <BriefcaseIcon className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No applications yet</h3>
          <p className="text-sm text-navy-300 mb-6">Browse open requisitions and casting breakdowns to apply.</p>
          <Button onClick={() => window.location.href = "/discover"}>Browse Opportunities</Button>
        </div>
      ) : (
        <div className="space-y-3">
          {sampleApplications.map((app) => (
            <Card key={app.id} variant="interactive" className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-semibold text-white">{app.role}</h3>
                    <Badge variant={statusColors[app.status] || "default"} size="sm">{app.status.replace("_", " ")}</Badge>
                  </div>
                  <p className="text-sm text-accent mt-0.5">{app.project}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-navy-300">
                    <span>Applied {app.appliedDate}</span>
                    <span>{app.rate}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
