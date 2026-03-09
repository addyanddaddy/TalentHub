"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge, StatusDot } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CalendarDaysIcon, PlusIcon } from "@heroicons/react/24/outline";

const sampleAvailability = [
  { id: 1, startDate: "2026-03-15", endDate: "2026-06-30", status: "AVAILABLE", city: "Los Angeles", region: "California" },
  { id: 2, startDate: "2026-07-01", endDate: "2026-07-14", status: "SOFT_HOLD", city: "Atlanta", region: "Georgia" },
  { id: 3, startDate: "2026-08-01", endDate: "2026-10-31", status: "AVAILABLE", city: "Los Angeles", region: "California" },
];

const statusMap: Record<string, { label: string; dot: "available" | "hold" | "booked" }> = {
  AVAILABLE: { label: "Available", dot: "available" },
  SOFT_HOLD: { label: "Soft Hold", dot: "hold" },
  FIRM_HOLD: { label: "Firm Hold", dot: "hold" },
  BOOKED: { label: "Booked", dot: "booked" },
};

export default function AvailabilityPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Availability</h1>
          <p className="text-sm text-navy-200 mt-1">Manage your schedule so productions can find you when you are free.</p>
        </div>
        <Button className="gap-2" onClick={() => setShowForm(!showForm)}>
          <PlusIcon className="h-4 w-4" />
          Add Availability
        </Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <h3 className="text-base font-semibold text-white mb-4">New Availability Block</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="Start Date" type="date" />
            <Input label="End Date" type="date" />
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-navy-100">Status</label>
              <select className="w-full rounded-lg border border-navy-600 bg-navy-700 px-3 py-2.5 text-sm text-white focus:border-accent focus:outline-none">
                <option value="AVAILABLE">Available</option>
                <option value="SOFT_HOLD">Soft Hold</option>
                <option value="FIRM_HOLD">Firm Hold</option>
                <option value="BOOKED">Booked</option>
              </select>
            </div>
            <Input label="City" placeholder="Los Angeles" />
            <Input label="Region" placeholder="California" />
            <Input label="Country" placeholder="United States" />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button>Save</Button>
          </div>
        </Card>
      )}

      <div className="space-y-3">
        {sampleAvailability.map((a) => {
          const info = statusMap[a.status] || statusMap.AVAILABLE;
          return (
            <Card key={a.id} className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
                    <CalendarDaysIcon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-white">
                        {new Date(a.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} — {new Date(a.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                      <StatusDot status={info.dot} />
                      <Badge variant={a.status === "AVAILABLE" ? "success" : "warning"} size="sm">{info.label}</Badge>
                    </div>
                    <p className="text-xs text-navy-200 mt-0.5">{a.city}, {a.region}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
