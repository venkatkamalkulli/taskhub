"use client";

import { useEffect, useState } from "react";

import {
  getTasks,
  uploadGeneratedImage,
  submitGeneratedImage,
} from "@/services/task.service";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  product_image_url?: string;
}

export default function UserTasksPage() {

  useProtectedRoute();

  const [tasks, setTasks] = useState<Task[]>([]);

  const [image, setImage] = useState<File | null>(null);

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

  async function handleSubmit(
    taskId: string
  ): Promise<void> {

    try {

      if (!image) {
        alert("Select Image");
        return;
      }

      const imageUrl =
        await uploadGeneratedImage(image);

      await submitGeneratedImage(
        taskId,
        imageUrl
      );

      alert("Image Submitted");

      setImage(null);

    } catch (error) {

      console.log(error);

      alert("Submission Failed");
    }
  }

  return (
    <main className="min-h-screen p-10 bg-black text-white">

      <h1 className="text-5xl font-bold mb-10">
        User Tasks
      </h1>

      <div className="grid gap-5">

        {tasks.map((task) => (

          <div
            key={task.id}
            className="border border-gray-700 p-5 rounded-xl"
          >

            {task.product_image_url && (

              <img
                src={task.product_image_url}
                alt={task.title}
                className="w-40 h-40 object-cover rounded-xl mb-4"
              />

            )}

            <h2 className="text-2xl font-bold">
              {task.title}
            </h2>

            <p className="text-gray-300 mt-2">
              {task.description}
            </p>

            <p className="mt-3 text-green-400">
              {task.status}
            </p>

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
              className="mt-5 bg-white text-black p-3 rounded-xl"
            />

            <button
              onClick={() =>
                handleSubmit(task.id)
              }
              className="mt-5 bg-green-600 px-5 py-3 rounded-xl"
            >
              Submit AI Image
            </button>

          </div>

        ))}

      </div>

    </main>
  );
}