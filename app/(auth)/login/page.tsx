"use client";

import { supabase } from "@/lib/supabase";

export default function LoginPage() {

  async function loginWithGoogle() {

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo:
          "http://localhost:3000",
      },
    });
  }

  async function loginWithGithub() {

    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo:
          "http://localhost:3000",
      },
    });
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white gap-6">

      <h1 className="text-5xl font-bold">
        Login to TaskHub
      </h1>

      <button
        onClick={loginWithGoogle}
        className="bg-white text-black px-8 py-4 rounded-xl font-bold"
      >
        Continue with Google
      </button>

      <button
        onClick={loginWithGithub}
        className="bg-zinc-800 text-white px-8 py-4 rounded-xl font-bold border border-zinc-700"
      >
        Continue with GitHub
      </button>

    </main>
  );
}