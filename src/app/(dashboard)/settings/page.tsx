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
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-navy-100">Settings</h1>
        <p className="text-sm text-navy-200 mt-1">Manage your account, billing, and preferences.</p>
      </div>

      {/* Account */}
      <Card className="p-6">
        <h2 className="text-base font-semibold text-white mb-4">Account Information</h2>
        <div className="flex items-center gap-4 mb-6">
          <Avatar name={session?.user?.name || "User"} size="lg" />
          <div>
            <p className="font-medium text-white">{session?.user?.name}</p>
            <p className="text-sm text-navy-200">{session?.user?.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Full Name" defaultValue={session?.user?.name || ""} />
          <Input label="Email" defaultValue={session?.user?.email || ""} disabled />
          <Input label="Phone" placeholder="+1 (555) 000-0000" />
        </div>
        <div className="flex justify-end mt-4">
          <Button size="sm">Save Changes</Button>
        </div>
      </Card>

      {/* Subscription */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-white">Subscription</h2>
          <Badge variant="gold" size="md">{(session?.user as any)?.membershipTier || "FREE"}</Badge>
        </div>
        <p className="text-sm text-navy-200 mb-4">Your current plan determines what features you can access on the platform.</p>
        <Button variant="outline" size="sm">Manage Subscription</Button>
      </Card>

      {/* Password */}
      <Card className="p-6">
        <h2 className="text-base font-semibold text-white mb-4">Change Password</h2>
        <div className="space-y-4 max-w-sm">
          <Input label="Current Password" type="password" />
          <Input label="New Password" type="password" />
          <Input label="Confirm New Password" type="password" />
        </div>
        <div className="flex justify-end mt-4">
          <Button size="sm">Update Password</Button>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border-red-900/50">
        <h2 className="text-base font-semibold text-red-400 mb-4">Danger Zone</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white">Sign Out</p>
            <p className="text-xs text-navy-300">Sign out of your account on this device.</p>
          </div>
          <Button variant="danger" size="sm" onClick={() => signOut({ callbackUrl: "/" })}>
            Sign Out
          </Button>
        </div>
      </Card>
    </div>
  );
}
