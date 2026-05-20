"use client";

import { useEffect, useState } from "react";

import {
  getGeneratedImages,
} from "@/services/task.service";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

interface GeneratedImage {
  id: string;
  image_url: string;
  task_id: string;
}
export default function ReviewsPage() {

  useProtectedRoute();

  const [images, setImages] =
    useState<GeneratedImage[]>([]);

  async function loadImages(): Promise<void> {

    try {

      const data =
        await getGeneratedImages();

      setImages(
        (data as GeneratedImage[]) || []
      );

    } catch (error) {

      console.log(error);

    }
  }

  useEffect(() => {

    const fetchImages = async () => {
      await loadImages();
    };

    fetchImages();

  }, []);

  return (
    <main className="min-h-screen p-10 bg-black text-white">

      <h1 className="text-5xl font-bold mb-10">
        AI Submission Reviews
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {images.map((image) => (

          <div
            key={image.id}
            className="border border-gray-700 p-5 rounded-xl"
          >

            <img
              src={image.image_url}
              alt="Generated"
              className="w-full h-72 object-cover rounded-xl"
            />

            <p className="mt-4 text-sm text-gray-400">
              Task ID:
            </p>

            <p className="break-all">
              {image.task_id}
            </p>

          </div>

        ))}

      </div>

    </main>
  );
}