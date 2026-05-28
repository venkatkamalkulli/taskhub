"use client";

import {
  useEffect,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  supabase,
} from "@/lib/supabase";

export function useProtectedRoute() {

  const router = useRouter();

  useEffect(() => {

    async function checkAuth() {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {

        router.push("/login");

        return;
      }

      const adminEmails = [
        "venkatkulli5@gmail.com",
      ];

      if (
        !adminEmails.includes(
          user.email || ""
        )
      ) {

        router.push("/tasks");
      }
    }

    checkAuth();

  }, [router]);
}