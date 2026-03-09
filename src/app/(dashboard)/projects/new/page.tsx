"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const formats = [
  { value: "FEATURE", label: "Feature Film" },
  { value: "EPISODIC", label: "Episodic / TV Series" },
  { value: "SHORT", label: "Short Film" },
  { value: "COMMERCIAL", label: "Commercial" },
  { value: "MUSIC_VIDEO", label: "Music Video" },
  { value: "DOCUMENTARY", label: "Documentary" },
  { value: "WEB_SERIES", label: "Web Series" },
  { value: "THEATER", label: "Theater" },
];

const stages = [
  { value: "DEVELOPMENT", label: "Development" },
  { value: "PRE_PRODUCTION", label: "Pre-Production" },
  { value: "PRODUCTION", label: "Production" },
  { value: "POST_PRODUCTION", label: "Post-Production" },
];

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    logline: "",
    format: "FEATURE",
    stage: "DEVELOPMENT",
    visibility: "PRIVATE",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        router.push("/projects");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Create New Project</h1>
        <p className="text-sm text-zinc-400 mt-1">Set up a new production and start building your team.</p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Project Title"
            placeholder="e.g., Midnight Runner"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <Textarea
            label="Logline"
            placeholder="A brief summary of the project..."
            value={form.logline}
            onChange={(e) => setForm({ ...form, logline: e.target.value })}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-zinc-300">Format</label>
              <select
                value={form.format}
                onChange={(e) => setForm({ ...form, format: e.target.value })}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
              >
                {formats.map((f) => (
                  <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-zinc-300">Stage</label>
              <select
                value={form.stage}
                onChange={(e) => setForm({ ...form, stage: e.target.value })}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
              >
                {stages.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-zinc-300">Visibility</label>
            <select
              value={form.visibility}
              onChange={(e) => setForm({ ...form, visibility: e.target.value })}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
            >
              <option value="PRIVATE">Private — Only team members</option>
              <option value="INVITE_ONLY">Invite Only — Visible to invited users</option>
              <option value="PUBLIC">Public — Visible to all members</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={() => router.push("/projects")}>Cancel</Button>
            <Button type="submit" loading={loading}>Create Project</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
