"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

export function useProtectedRoute() {

  const router = useRouter();

  useEffect(() => {

    async function checkUser() {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
      }
    }

    checkUser();

  }, [router]);
}