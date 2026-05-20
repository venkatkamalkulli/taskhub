"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function Navbar() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  useEffect(() => {

    async function getUser() {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.email) {
        setEmail(user.email);
      }
    }

    getUser();

  }, []);

  async function handleLogout() {

    await supabase.auth.signOut();

    router.push("/login");
  }

  return (

    <header className="border-b border-zinc-800 bg-black px-8 py-5 flex items-center justify-between">

      <div>

        <h1 className="text-3xl font-bold text-white">

          TaskHub 🚀

        </h1>

      </div>

      <div className="flex items-center gap-5">

        <div className="text-right">

          <p className="text-white font-semibold">
            {email}
          </p>

          <p className="text-zinc-500 text-sm">
            Admin User
          </p>

        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 transition px-5 py-3 rounded-xl text-white font-semibold"
        >

          Logout

        </button>

      </div>

    </header>
  );
}