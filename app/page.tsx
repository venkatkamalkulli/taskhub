"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function HomePage() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function checkUser() {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {

        router.push("/dashboard");

      } else {

        router.push("/login");

      }

      setLoading(false);
    }

    checkUser();

  }, [router]);

  if (loading) {

    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">

        <h1 className="text-3xl">
          Loading...
        </h1>

      </main>
    );
  }

  return null;
}