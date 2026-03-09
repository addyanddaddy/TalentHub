"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: email.toLowerCase(),
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-950 px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex flex-col items-center gap-4">
          <Image src="/logo.png" alt="FrameOne" width={64} height={64} className="rounded-xl" />
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-navy-100">Log in to your account</h1>
            <p className="mt-1 text-sm text-navy-200">Enter your email and password below</p>
          </div>
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email address"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
            autoComplete="email"
          />

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-navy-100">Password</label>
              <Link href="/auth/forgot-password" className="text-xs text-accent hover:text-accent-light">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-navy-600 bg-navy-700 px-3 py-2.5 text-sm text-white placeholder-navy-300 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-colors"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-navy-200">
            <input type="checkbox" className="rounded border-navy-500 bg-navy-700 text-accent focus:ring-accent" />
            Remember me
          </label>

          <Button type="submit" className="w-full" loading={loading}>
            Log in
          </Button>
        </form>

        <p className="text-center text-sm text-navy-200">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="font-medium text-accent hover:text-accent-light">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
