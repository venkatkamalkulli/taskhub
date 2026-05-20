"use client";

import Link from "next/link";

export default function HomePage() {

  return (

    <main className="min-h-screen bg-black text-white">

      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">

        <div className="max-w-5xl">

          <h1 className="text-6xl md:text-8xl font-extrabold leading-tight">

            Manage AI Tasks

            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              {" "}Faster 🚀
            </span>

          </h1>

          <p className="text-zinc-400 text-xl mt-8 max-w-3xl mx-auto leading-relaxed">

            TaskHub is a modern AI-powered task management platform
            for teams, creators, and AI workflows.

          </p>

          <div className="flex flex-col md:flex-row gap-5 justify-center mt-12">

            <Link href="/login">

              <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition">

                Get Started

              </button>

            </Link>

            <Link href="/dashboard">

              <button className="border border-zinc-700 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-zinc-900 transition">

                Open Dashboard

              </button>

            </Link>

          </div>

        </div>

      </section>

      <section className="px-6 pb-24">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-5xl font-bold text-center mb-20">

            Powerful Features

          </h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">

              <h3 className="text-2xl font-bold">
                OAuth Authentication
              </h3>

              <p className="text-zinc-400 mt-4">
                Secure Google and GitHub login integration powered by Supabase.
              </p>

            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">

              <h3 className="text-2xl font-bold">
                AI Task Workflow
              </h3>

              <p className="text-zinc-400 mt-4">
                Create, assign, review, and manage AI-generated task submissions.
              </p>

            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">

              <h3 className="text-2xl font-bold">
                Analytics Dashboard
              </h3>

              <p className="text-zinc-400 mt-4">
                Track pending, completed, and active tasks in real-time.
              </p>

            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">

              <h3 className="text-2xl font-bold">
                Activity Logs
              </h3>

              <p className="text-zinc-400 mt-4">
                Monitor every important admin action with live audit logs.
              </p>

            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">

              <h3 className="text-2xl font-bold">
                Cloud Storage
              </h3>

              <p className="text-zinc-400 mt-4">
                Upload product images and AI submissions directly to Supabase Storage.
              </p>

            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">

              <h3 className="text-2xl font-bold">
                Fully Responsive
              </h3>

              <p className="text-zinc-400 mt-4">
                Optimized experience across desktop, tablet, and mobile devices.
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
