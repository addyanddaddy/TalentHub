"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlusIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

const statusColors: Record<string, "default" | "primary" | "success" | "warning" | "danger"> = {
  DRAFT: "default",
  SUBMITTED: "primary",
  APPROVED: "success",
  PAID: "success",
  DISPUTED: "danger",
};

const sampleInvoices = [
  { id: 1, project: "Midnight Runner", vendor: "Stellar Catering Co.", amount: "$8,500.00", status: "APPROVED", date: "Mar 6, 2026" },
  { id: 2, project: "Midnight Runner", vendor: "GripTech Rentals", amount: "$3,200.00", status: "SUBMITTED", date: "Mar 8, 2026" },
  { id: 3, project: "City Pulse", vendor: "LA Transport Services", amount: "$5,100.00", status: "PAID", date: "Feb 28, 2026" },
];

export default function InvoicesPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Invoices</h1>
          <p className="text-sm text-navy-200 mt-1">Submit and manage invoices for your services.</p>
        </div>
        <Button className="gap-2">
          <PlusIcon className="h-4 w-4" />
          Create Invoice
        </Button>
      </div>

      {sampleInvoices.length === 0 ? (
        <div className="rounded-xl border border-dashed border-navy-700 bg-navy-900/30 p-16 text-center">
          <DocumentTextIcon className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No invoices yet</h3>
          <p className="text-sm text-navy-300 mb-6">Create an invoice to bill a production for your services.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sampleInvoices.map((inv) => (
            <Card key={inv.id} variant="interactive" className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-semibold text-white">{inv.vendor}</h3>
                    <Badge variant={statusColors[inv.status] || "default"} size="sm">{inv.status}</Badge>
                  </div>
                  <p className="text-sm text-accent mt-0.5">{inv.project}</p>
                  <p className="text-xs text-navy-300 mt-1">Submitted {inv.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-white">{inv.amount}</p>
                  <Button variant="ghost" size="sm" className="mt-1">View</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
