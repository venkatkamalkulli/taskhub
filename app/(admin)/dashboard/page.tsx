"use client";

import { useEffect, useState } from "react";

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

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  product_image_url?: string;
}

export default function DashboardPage() {
  useProtectedRoute();
  const [title, setTitle] = useState("");
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

      alert(
        "Task Created Successfully"
      );

      setTitle("");
      setDescription("");
      setImage(null);

      await loadTasks();

    } catch (error) {

      console.log(error);

      if (error instanceof Error) {

        alert(error.message);

      } else {

        alert("Unknown Error");

      }
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

      alert("Task Deleted");

      await loadTasks();

    } catch (error) {

      console.log(error);

      alert(
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

      alert("Task Updated");

      await loadTasks();

    } catch (error) {

      console.log(error);

      alert(
        "Failed to update task"
      );
    }
  }

  return (

    <div className="flex bg-black min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <main className="p-10 text-white">

          <h1 className="text-5xl font-bold mb-10">
            Admin Dashboard
          </h1>

          <div className="grid md:grid-cols-3 gap-6 mb-12">

            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl">

              <h3 className="text-zinc-400 text-lg">
                Total Tasks
              </h3>

              <p className="text-5xl font-bold mt-4">
                {totalTasks}
              </p>

            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl">

              <h3 className="text-zinc-400 text-lg">
                Completed
              </h3>

              <p className="text-5xl font-bold mt-4 text-green-400">
                {completedTasks}
              </p>

            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl">

              <h3 className="text-zinc-400 text-lg">
                Pending
              </h3>

              <p className="text-5xl font-bold mt-4 text-yellow-400">
                {pendingTasks}
              </p>

            </div>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl max-w-2xl">

            <div className="flex flex-col gap-5">

              <input
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                placeholder="Task Title"
                className="p-4 rounded-xl bg-zinc-800 text-white border border-zinc-700"
              />

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                placeholder="Task Description"
                className="p-4 rounded-xl bg-zinc-800 text-white border border-zinc-700"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {

                  const file =
                    e.target.files?.[0];

                  if (file) {
                    setImage(file);
                  }

                }}
                className="bg-zinc-800 text-white p-4 rounded-xl"
              />

              <button
                onClick={
                  handleCreateTask
                }
                className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-xl font-bold"
              >
                Create Task
              </button>

            </div>

          </div>

          <div className="mt-16">

            <h2 className="text-4xl font-bold mb-8">
              All Tasks
            </h2>

            <div className="flex flex-col md:flex-row gap-5 mb-8">

              <input
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search tasks..."
                className="flex-1 p-4 rounded-xl bg-zinc-800 border border-zinc-700 text-white"
              />

              <select
                value={filter}
                onChange={(e) =>
                  setFilter(
                    e.target.value
                  )
                }
                className="p-4 rounded-xl bg-zinc-800 border border-zinc-700 text-white"
              >

                <option value="all">
                  All
                </option>

                <option value="pending">
                  Pending
                </option>

                <option value="completed">
                  Completed
                </option>

              </select>

            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

              {filteredTasks.map(
                (task) => (

                  <div
                    key={task.id}
                    className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden"
                  >

                    {task.product_image_url && (

                      <img
                        src={
                          task.product_image_url
                        }
                        alt={task.title}
                        className="w-full h-64 object-cover"
                      />

                    )}

                    <div className="p-6">

                      <h3 className="text-2xl font-bold">
                        {task.title}
                      </h3>

                      <p className="text-zinc-400 mt-3">
                        {task.description}
                      </p>

                      <div className="mt-4">

                        <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm">
                          {task.status}
                        </span>

                      </div>

                      <div className="flex flex-wrap gap-3 mt-6">

                        <button
                          onClick={() =>
                            handleStatusUpdate(
                              task.id,
                              "pending"
                            )
                          }
                          className="bg-yellow-500 px-4 py-2 rounded-xl"
                        >
                          Pending
                        </button>

                        <button
                          onClick={() =>
                            handleStatusUpdate(
                              task.id,
                              "completed"
                            )
                          }
                          className="bg-green-600 px-4 py-2 rounded-xl"
                        >
                          Complete
                        </button>

                        <button
                          onClick={() =>
                            handleDeleteTask(
                              task.id
                            )
                          }
                          className="bg-red-600 px-4 py-2 rounded-xl"
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}