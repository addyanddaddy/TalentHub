"use client";

import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/badge";

export default function MessagesPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Messages</h1>
        <p className="text-sm text-zinc-400 mt-1">Communication and notifications.</p>
      </div>

      <div className="rounded-xl border border-dashed border-zinc-800 bg-zinc-900/30 p-16 text-center">
        <ChatBubbleLeftRightIcon className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">Messaging Coming Soon</h3>
        <p className="text-sm text-zinc-500 mb-6 max-w-md mx-auto">
          Direct messaging between professionals is being built for Phase 2. For now, contact information is available on profile pages.
        </p>
        <Badge variant="primary" size="md">Phase 2 Feature</Badge>
      </div>
    </div>
  );
}
