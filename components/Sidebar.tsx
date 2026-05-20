"use client";

import Link from "next/link";

import {
  LayoutDashboard,
  ClipboardList,
  Star,
  Activity,
  Menu,
  X,
} from "lucide-react";

import {
  useState,
} from "react";

export default function Sidebar() {

  const [open, setOpen] =
    useState(false);

  return (

    <>

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="fixed top-5 left-5 z-50 md:hidden bg-zinc-900 p-3 rounded-xl border border-zinc-700 text-white"
      >

        {open ? <X /> : <Menu />}

      </button>

      <aside
        className={`fixed md:static top-0 left-0 h-screen w-72 bg-zinc-950 border-r border-zinc-800 p-8 z-40 transform transition-transform duration-300 ${
          open
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >

        <h1 className="text-4xl font-extrabold text-white mb-14">

          TaskHub 🚀

        </h1>

        <nav className="flex flex-col gap-5">

          <Link
            href="/dashboard"
            className="flex items-center gap-4 bg-zinc-900 hover:bg-zinc-800 transition p-4 rounded-2xl text-white font-semibold"
          >

            <LayoutDashboard />

            Dashboard

          </Link>

          <Link
            href="/tasks"
            className="flex items-center gap-4 bg-zinc-900 hover:bg-zinc-800 transition p-4 rounded-2xl text-white font-semibold"
          >

            <ClipboardList />

            User Tasks

          </Link>

          <Link
            href="/reviews"
            className="flex items-center gap-4 bg-zinc-900 hover:bg-zinc-800 transition p-4 rounded-2xl text-white font-semibold"
          >

            <Star />

            Reviews

          </Link>

          <Link
            href="/activity"
            className="flex items-center gap-4 bg-zinc-900 hover:bg-zinc-800 transition p-4 rounded-2xl text-white font-semibold"
          >

            <Activity />

            Activity Logs

          </Link>

        </nav>

      </aside>

    </>
  );
}