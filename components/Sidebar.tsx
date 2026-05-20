"use client";

import Link from "next/link";

import {
  LayoutDashboard,
  ClipboardList,
  Image,
} from "lucide-react";

export default function Sidebar() {

  return (
    <aside className="w-72 min-h-screen bg-zinc-950 border-r border-zinc-800 p-6">

      <h1 className="text-3xl font-bold text-white mb-10">
        TaskHub 🚀
      </h1>

      <nav className="flex flex-col gap-4">

        <Link
          href="/dashboard"
          className="flex items-center gap-3 text-white hover:bg-zinc-800 p-4 rounded-xl transition"
        >
          <LayoutDashboard size={22} />
          Dashboard
        </Link>

        <Link
          href="/tasks"
          className="flex items-center gap-3 text-white hover:bg-zinc-800 p-4 rounded-xl transition"
        >
          <ClipboardList size={22} />
          User Tasks
        </Link>

        <Link
          href="/reviews"
          className="flex items-center gap-3 text-white hover:bg-zinc-800 p-4 rounded-xl transition"
        >
          <Image size={22} />
          Reviews
        </Link>

      </nav>

    </aside>
  );
}