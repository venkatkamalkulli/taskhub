"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

import { useProtectedRoute } from "@/hooks/useProtectedRoute";

import {
  createTask,
  getTasks,
  deleteTask,
  updateTaskStatus,
  uploadProductImage,
  createActivityLog,
} from "@/services/task.service";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import toast from "react-hot-toast";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  product_image_url?: string;
}

export default function DashboardPage() {

  useProtectedRoute();

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [image, setImage] =
    useState<File | null>(null);

  const [tasks, setTasks] =
    useState<Task[]>([]);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("all");

  async function loadTasks(): Promise<void> {

    try {

      const data = await getTasks();

      setTasks((data as Task[]) || []);

    } catch (error) {

      console.log(error);
    }
  }

  useEffect(() => {

    const fetchTasks = async () => {
      await loadTasks();
    };

    fetchTasks();

  }, []);

  const totalTasks = tasks.length;

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status === "completed"
    ).length;

  const pendingTasks =
    tasks.filter(
      (task) =>
        task.status === "pending"
    ).length;

  const chartData = [
    {
      name: "Completed",
      value: completedTasks,
    },
    {
      name: "Pending",
      value: pendingTasks,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#eab308",
  ];

  const filteredTasks = tasks.filter(
    (task) => {

      const matchesSearch =
        task.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesFilter =
        filter === "all" ||
        task.status === filter;

      return (
        matchesSearch &&
        matchesFilter
      );
    }
  );

  async function handleCreateTask(): Promise<void> {

    try {

      let imageUrl = "";

      if (image) {

        imageUrl =
          await uploadProductImage(
            image
          );
      }

      await createTask({
        title,
        description,
        product_image_url: imageUrl,
      });

      await createActivityLog(
        `Created task: ${title}`
      );

      toast.success(
        "Task Created Successfully"
      );

      setTitle("");
      setDescription("");
      setImage(null);

      await loadTasks();

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to create task"
      );
    }
  }

  async function handleDeleteTask(
    id: string
  ): Promise<void> {

    try {

      await deleteTask(id);

      await createActivityLog(
        "Deleted a task"
      );

      toast.success(
        "Task Deleted"
      );

      await loadTasks();

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to delete task"
      );
    }
  }

  async function handleStatusUpdate(
    id: string,
    status: string
  ): Promise<void> {

    try {

      await updateTaskStatus(
        id,
        status
      );

      await createActivityLog(
        `Updated task to ${status}`
      );

      toast.success(
        "Task Updated"
      );

      await loadTasks();

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to update task"
      );
    }
  }

  return (

    <div className="flex bg-black min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <motion.main
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-10 text-white"
        >

          <h1 className="text-6xl font-extrabold mb-12 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">

            Admin Dashboard

          </h1>

          <div className="grid md:grid-cols-3 gap-8 mb-14">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-3xl p-8 shadow-2xl hover:scale-105 transition duration-300"
            >

              <p className="text-zinc-400 text-xl">
                Total Tasks
              </p>

              <h2 className="text-6xl font-extrabold mt-5 text-white">
                {totalTasks}
              </h2>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-green-950 to-zinc-900 border border-green-700 rounded-3xl p-8 shadow-2xl hover:scale-105 transition duration-300"
            >

              <p className="text-zinc-300 text-xl">
                Completed
              </p>

              <h2 className="text-6xl font-extrabold mt-5 text-green-400">
                {completedTasks}
              </h2>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-yellow-950 to-zinc-900 border border-yellow-700 rounded-3xl p-8 shadow-2xl hover:scale-105 transition duration-300"
            >

              <p className="text-zinc-300 text-xl">
                Pending
              </p>

              <h2 className="text-6xl font-extrabold mt-5 text-yellow-300">
                {pendingTasks}
              </h2>

            </motion.div>

          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-14 shadow-2xl"
          >

            <h2 className="text-3xl font-bold mb-8">

              Task Analytics

            </h2>

            <div className="h-[400px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={140}
                    dataKey="value"
                    label
                  >

                    {chartData.map(
                      (entry, index) => (

                        <Cell
                          key={index}
                          fill={
                            COLORS[index]
                          }
                        />

                      )
                    )}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-14 shadow-2xl"
          >

            <h2 className="text-3xl font-bold mb-8">

              Create New Task

            </h2>

            <div className="flex flex-col gap-5">

              <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                className="bg-zinc-800 border border-zinc-700 p-5 rounded-2xl outline-none text-lg"
              />

              <textarea
                placeholder="Task Description"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                className="bg-zinc-800 border border-zinc-700 p-5 rounded-2xl outline-none text-lg min-h-[140px]"
              />

              <input
                type="file"
                onChange={(e) => {

                  if (e.target.files?.[0]) {

                    setImage(
                      e.target.files[0]
                    );
                  }

                }}
                className="bg-zinc-800 border border-zinc-700 p-4 rounded-2xl"
              />

              <button
                onClick={handleCreateTask}
                className="bg-gradient-to-r from-purple-500 to-pink-500 py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] transition"
              >

                Create Task

              </button>

            </div>

          </motion.div>

          <div className="flex flex-col md:flex-row gap-5 mb-10">

            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="flex-1 bg-zinc-900 border border-zinc-800 p-4 rounded-2xl"
            />

            <select
              value={filter}
              onChange={(e) =>
                setFilter(
                  e.target.value
                )
              }
              className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl"
            >

              <option value="all">
                All Tasks
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="completed">
                Completed
              </option>

            </select>

          </div>

          <div className="grid gap-8">

            {filteredTasks.map((task) => (

              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-xl hover:scale-[1.01] transition"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                  <div>

                    <h2 className="text-3xl font-bold">
                      {task.title}
                    </h2>

                    <p className="text-zinc-400 mt-4 text-lg">
                      {task.description}
                    </p>

                    <div className="mt-5">

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-bold ${
                          task.status ===
                          "completed"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-300"
                        }`}
                      >

                        {task.status}

                      </span>

                    </div>

                  </div>

                  <div className="flex flex-wrap gap-4">

                    <button
                      onClick={() =>
                        handleStatusUpdate(
                          task.id,
                          "completed"
                        )
                      }
                      className="bg-green-600 hover:bg-green-700 transition px-5 py-3 rounded-2xl font-semibold"
                    >

                      Complete

                    </button>

                    <button
                      onClick={() =>
                        handleDeleteTask(
                          task.id
                        )
                      }
                      className="bg-red-600 hover:bg-red-700 transition px-5 py-3 rounded-2xl font-semibold"
                    >

                      Delete

                    </button>

                  </div>

                </div>

              </motion.div>

            ))}

          </div>

        </motion.main>

      </div>

    </div>
  );
}