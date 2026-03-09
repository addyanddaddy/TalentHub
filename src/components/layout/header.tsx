"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { MagnifyingGlassIcon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Avatar } from "@/components/ui/avatar";

interface HeaderProps {
  title?: string;
  user?: {
    name?: string | null;
    image?: string | null;
  };
}

const sampleNotifications = [
  { id: 1, text: "Ralph Martinez invited you to Midnight Runner", time: "2 hours ago", read: false, link: "/projects" },
  { id: 2, text: "New casting breakdown: Lead Detective", time: "5 hours ago", read: false, link: "/casting" },
  { id: 3, text: "Shahpoor Ahmadi endorsed your work", time: "Yesterday", read: false, link: "/profile/edit" },
  { id: 4, text: "Your application for DP on City Pulse was viewed", time: "2 days ago", read: true, link: "/applications" },
  { id: 5, text: "Welcome to FrameOne! Complete your profile to get started.", time: "3 days ago", read: true, link: "/profile/edit" },
];

export function Header({ title, user }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState(sampleNotifications);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-navy-700 bg-navy-900/90 backdrop-blur-md px-4 lg:px-8">
      <h1 className="text-lg font-semibold text-white pl-10 lg:pl-0">{title}</h1>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 rounded-lg border border-navy-700 bg-navy-900 px-3 py-1.5">
          <MagnifyingGlassIcon className="h-4 w-4 text-navy-300" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-white placeholder-navy-300 outline-none w-48"
          />
          <kbd className="hidden sm:inline-flex items-center rounded border border-navy-600 bg-navy-700 px-1.5 py-0.5 text-[10px] text-navy-300">
            /
          </kbd>
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false); }}
            className="relative rounded-lg p-2 text-navy-200 hover:bg-navy-700 hover:text-white transition-colors"
          >
            <BellIcon className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-navy-700 bg-navy-900 shadow-xl shadow-black/40 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-navy-700">
                <h3 className="text-sm font-semibold text-white">Notifications</h3>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-xs text-accent hover:text-accent-light">
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notif) => (
                  <Link
                    key={notif.id}
                    href={notif.link}
                    onClick={() => {
                      setNotifications(notifications.map((n) => n.id === notif.id ? { ...n, read: true } : n));
                      setShowNotifications(false);
                    }}
                    className={`flex items-start gap-3 px-4 py-3 hover:bg-navy-700/50 transition-colors ${
                      !notif.read ? "bg-accent/5" : ""
                    }`}
                  >
                    {!notif.read && (
                      <span className="mt-1.5 flex h-2 w-2 shrink-0 rounded-full bg-accent" />
                    )}
                    <div className={!notif.read ? "" : "pl-5"}>
                      <p className={`text-sm leading-snug ${!notif.read ? "text-white" : "text-navy-200"}`}>
                        {notif.text}
                      </p>
                      <p className="text-xs text-navy-300 mt-1">{notif.time}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href="/messages"
                onClick={() => setShowNotifications(false)}
                className="block text-center px-4 py-3 text-xs font-medium text-accent hover:text-accent-light border-t border-navy-700"
              >
                View all notifications
              </Link>
            </div>
          )}
        </div>

        {/* User menu */}
        {user && (
          <div className="relative" ref={userRef}>
            <button
              onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false); }}
              className="rounded-full hover:ring-2 hover:ring-zinc-700 transition-all"
            >
              <Avatar name={user.name || "User"} src={user.image} size="sm" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-navy-700 bg-navy-900 shadow-xl shadow-black/40 overflow-hidden">
                <div className="px-4 py-3 border-b border-navy-700">
                  <p className="text-sm font-semibold text-white">{user.name}</p>
                </div>
                <div className="py-1">
                  <Link href="/profile/edit" onClick={() => setShowUserMenu(false)} className="block px-4 py-2 text-sm text-navy-200 hover:bg-navy-700 hover:text-white transition-colors">
                    My Profiles
                  </Link>
                  <Link href="/settings" onClick={() => setShowUserMenu(false)} className="block px-4 py-2 text-sm text-navy-200 hover:bg-navy-700 hover:text-white transition-colors">
                    Settings
                  </Link>
                  <Link href="/availability" onClick={() => setShowUserMenu(false)} className="block px-4 py-2 text-sm text-navy-200 hover:bg-navy-700 hover:text-white transition-colors">
                    Availability
                  </Link>
                </div>
                <div className="border-t border-navy-700 py-1">
                  <Link href="/api/auth/signout" onClick={() => setShowUserMenu(false)} className="block px-4 py-2 text-sm text-red-400 hover:bg-navy-700 transition-colors">
                    Sign Out
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
