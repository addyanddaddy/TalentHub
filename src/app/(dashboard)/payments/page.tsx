"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CurrencyDollarIcon, ArrowUpRightIcon, ArrowDownLeftIcon } from "@heroicons/react/24/outline";

const sampleTransactions = [
  { id: 1, type: "incoming", description: "Payment for Midnight Runner - DP Services", amount: "$12,800.00", date: "Mar 8, 2026", status: "COMPLETED" },
  { id: 2, type: "incoming", description: "Payment for City Pulse - Camera Op", amount: "$4,400.00", date: "Mar 1, 2026", status: "COMPLETED" },
  { id: 3, type: "outgoing", description: "Pro Supply Subscription", amount: "$19.00", date: "Mar 1, 2026", status: "COMPLETED" },
];

export default function PaymentsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-100">Payments</h1>
          <p className="text-sm text-navy-200 mt-1">Track earnings, payouts, and subscription billing.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <CurrencyDollarIcon className="h-4 w-4" />
          Connect Stripe
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5">
          <p className="text-sm text-navy-200">Total Earned</p>
          <p className="text-2xl font-bold text-white mt-1">$17,200.00</p>
          <p className="text-xs text-emerald-400 mt-1">+$12,800 this month</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-navy-200">Pending Payouts</p>
          <p className="text-2xl font-bold text-white mt-1">$0.00</p>
          <p className="text-xs text-navy-300 mt-1">All caught up</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-navy-200">Subscription</p>
          <p className="text-2xl font-bold text-white mt-1">$19/mo</p>
          <p className="text-xs text-navy-300 mt-1">Pro Supply • Renews Apr 1</p>
        </Card>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-navy-100 mb-4">Recent Transactions</h2>
        <div className="space-y-2">
          {sampleTransactions.map((tx) => (
            <Card key={tx.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${tx.type === "incoming" ? "bg-emerald-500/10" : "bg-navy-700"}`}>
                    {tx.type === "incoming" ? (
                      <ArrowDownLeftIcon className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <ArrowUpRightIcon className="h-4 w-4 text-navy-200" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{tx.description}</p>
                    <p className="text-xs text-navy-300">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${tx.type === "incoming" ? "text-emerald-400" : "text-white"}`}>
                    {tx.type === "incoming" ? "+" : "-"}{tx.amount}
                  </p>
                  <Badge variant="success" size="sm">{tx.status}</Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
