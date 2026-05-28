"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

import {
  ChevronDown,
} from "lucide-react";

export default function Navbar() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [open, setOpen] =
    useState(false);

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

      <div className="relative">

        <button
          onClick={() =>
            setOpen(!open)
          }
          className="flex items-center gap-3 bg-zinc-900 hover:bg-zinc-800 transition px-4 py-3 rounded-2xl"
        >

          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white">

            {email.charAt(0).toUpperCase()}

          </div>

          <div className="text-left hidden md:block">

            <p className="text-white text-sm font-semibold">

              {email}

            </p>

            <p className="text-zinc-500 text-xs">

              User Profile

            </p>

          </div>

          <ChevronDown
            className="text-zinc-400"
            size={18}
          />

        </button>

        {open && (

          <div className="absolute right-0 mt-4 w-72 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl p-5 z-50">

            <div className="mb-5">

              <p className="text-white font-semibold">

                {email}

              </p>

              <p className="text-zinc-500 text-sm">

                Logged In

              </p>

            </div>

            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 transition py-3 rounded-2xl text-white font-semibold"
            >

              Logout

            </button>

          </div>

        )}

      </div>

    </header>
  );
}