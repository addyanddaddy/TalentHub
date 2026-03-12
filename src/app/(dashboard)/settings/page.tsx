"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-10 animate-fade-in max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-light tracking-tight text-[#edebe2]">Settings</h1>
        <p className="text-sm text-[#8a8a96] mt-2 tracking-wide">Manage your account, billing, and preferences.</p>
      </div>

      {/* Account Information */}
      <div className="rounded-2xl bg-[#1a1a22] border border-white/[0.08] p-8">
        <h2 className="text-lg font-light text-[#edebe2] mb-6">Account Information</h2>
        <div className="flex items-center gap-5 mb-8 pb-8 border-b border-white/[0.06]">
          <Avatar name={session?.user?.name || "User"} size="lg" />
          <div>
            <p className="font-normal text-[#edebe2]">{session?.user?.name}</p>
            <p className="text-sm text-[#8a8a96] mt-0.5">{session?.user?.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-[#8a8a96] mb-2">Full Name</label>
            <Input defaultValue={session?.user?.name || ""} className="bg-white/[0.04] border-white/[0.08] rounded-xl text-[#edebe2] placeholder:text-[#8a8a96]/50 focus:border-[#9d7663]/50 focus:ring-[#9d7663]/20 transition-all duration-300" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-[#8a8a96] mb-2">Email</label>
            <Input defaultValue={session?.user?.email || ""} disabled className="bg-white/[0.02] border-white/[0.06] rounded-xl text-[#8a8a96] opacity-60" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-[#8a8a96] mb-2">Phone</label>
            <Input placeholder="+1 (555) 000-0000" className="bg-white/[0.04] border-white/[0.08] rounded-xl text-[#edebe2] placeholder:text-[#8a8a96]/50 focus:border-[#9d7663]/50 focus:ring-[#9d7663]/20 transition-all duration-300" />
          </div>
        </div>
        <div className="flex justify-end mt-6 pt-6 border-t border-white/[0.06]">
          <Button size="sm" className="rounded-xl bg-[#9d7663] text-white hover:bg-[#c4a47a] transition-all duration-300 px-6">Save Changes</Button>
        </div>
      </div>

      {/* Subscription */}
      <div className="rounded-2xl bg-[#1a1a22] border border-white/[0.08] p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-light text-[#edebe2]">Subscription</h2>
          <span className="inline-flex items-center rounded-full bg-[#9d7663]/15 px-3 py-1 text-xs uppercase tracking-[0.15em] text-[#c4a47a]">
            {(session?.user as any)?.membershipTier || "FREE"}
          </span>
        </div>
        <p className="text-sm text-[#8a8a96] mb-6 leading-relaxed">Your current plan determines what features you can access on the platform.</p>
        <Button variant="outline" size="sm" className="rounded-xl border-white/[0.08] text-[#b8b5a8] hover:bg-white/[0.04] hover:text-[#edebe2] transition-all duration-300">
          Manage Subscription
        </Button>
      </div>

      {/* Notifications */}
      <div className="rounded-2xl bg-[#1a1a22] border border-white/[0.08] p-8">
        <h2 className="text-lg font-light text-[#edebe2] mb-6">Notifications</h2>
        <div className="space-y-0 divide-y divide-white/[0.06]">
          {[
            { label: "Email notifications", desc: "Receive updates about your projects and invoices" },
            { label: "SMS alerts", desc: "Get text alerts for urgent production updates" },
            { label: "Marketing emails", desc: "News, tips, and product updates from FrameOne" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-5 first:pt-0 last:pb-0">
              <div>
                <p className="text-sm text-[#edebe2]">{item.label}</p>
                <p className="text-xs text-[#8a8a96] mt-0.5">{item.desc}</p>
              </div>
              {/* Toggle switch - bronze when active */}
              <button
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 focus:outline-none ${i === 0 ? "bg-[#9d7663]" : "bg-white/[0.08]"}`}
                role="switch"
                aria-checked={i === 0}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-300 ${i === 0 ? "translate-x-5" : "translate-x-0"}`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Change Password */}
      <div className="rounded-2xl bg-[#1a1a22] border border-white/[0.08] p-8">
        <h2 className="text-lg font-light text-[#edebe2] mb-6">Change Password</h2>
        <div className="space-y-5 max-w-sm">
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-[#8a8a96] mb-2">Current Password</label>
            <Input type="password" className="bg-white/[0.04] border-white/[0.08] rounded-xl text-[#edebe2] focus:border-[#9d7663]/50 focus:ring-[#9d7663]/20 transition-all duration-300" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-[#8a8a96] mb-2">New Password</label>
            <Input type="password" className="bg-white/[0.04] border-white/[0.08] rounded-xl text-[#edebe2] focus:border-[#9d7663]/50 focus:ring-[#9d7663]/20 transition-all duration-300" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-[#8a8a96] mb-2">Confirm New Password</label>
            <Input type="password" className="bg-white/[0.04] border-white/[0.08] rounded-xl text-[#edebe2] focus:border-[#9d7663]/50 focus:ring-[#9d7663]/20 transition-all duration-300" />
          </div>
        </div>
        <div className="flex justify-end mt-6 pt-6 border-t border-white/[0.06]">
          <Button size="sm" className="rounded-xl bg-[#9d7663] text-white hover:bg-[#c4a47a] transition-all duration-300 px-6">Update Password</Button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-2xl bg-red-950/20 border border-red-500/[0.12] p-8">
        <h2 className="text-lg font-light text-red-400/80 mb-6">Danger Zone</h2>
        <div className="flex items-center justify-between py-4">
          <div>
            <p className="text-sm text-[#edebe2]">Sign Out</p>
            <p className="text-xs text-[#8a8a96] mt-0.5">Sign out of your account on this device.</p>
          </div>
          <Button
            size="sm"
            className="rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300 px-5"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign Out
          </Button>
        </div>
        <div className="border-t border-red-500/[0.08] mt-2 pt-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-[#edebe2]">Delete Account</p>
            <p className="text-xs text-[#8a8a96] mt-0.5">Permanently remove your account and all associated data.</p>
          </div>
          <Button
            size="sm"
            className="rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300 px-5"
          >
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}
