"use client";

import {
    useEffect,
    useState,
} from "react";

import { supabase } from "@/lib/supabase";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

interface Activity {
    id: string;
    action: string;
    created_at: string;
}

export default function ActivityPage() {

    useProtectedRoute();
    const [logs, setLogs] =
        useState<Activity[]>([]);

    async function loadLogs(): Promise<void> {

        const { data } =
            await supabase
                .from("audit_logs")
                .select("*")
                .order(
                    "created_at",
                    {
                        ascending: false,
                    }
                );

        setLogs(
            (data as Activity[]) || []
        );
    }

    useEffect(() => {

        const fetchLogs = async () => {
            await loadLogs();
        };

        fetchLogs();

    }, []);

    return (
        <main className="min-h-screen bg-black text-white p-10">

            <h1 className="text-5xl font-bold mb-10">
                Activity Logs
            </h1>

            <div className="space-y-5">

                {logs.map((log) => (

                    <div
                        key={log.id}
                        className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl"
                    >

                        <p className="text-xl">
                            {log.action}
                        </p>

                        <p className="text-zinc-500 mt-2">
                            {new Date(
                                log.created_at
                            ).toLocaleString()}
                        </p>

                    </div>

                ))}

            </div>

        </main>
    );
}