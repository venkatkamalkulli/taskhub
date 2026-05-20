import { supabase } from "@/lib/supabase";

export async function createTask(task: {
  title: string;
  description: string;
  product_image_url?: string;
}) {

  const { data, error } = await supabase
    .from("tasks")
    .insert([
      {
        title: task.title,
        description: task.description,
        product_image_url:
          task.product_image_url,
      },
    ])
    .select();

  if (error) {

    console.log(
      "MESSAGE:",
      error.message
    );

    console.log(
      "DETAILS:",
      error.details
    );

    console.log(
      "HINT:",
      error.hint
    );

    console.log(
      "CODE:",
      error.code
    );

    throw new Error(
      error.message
    );
  }

  return data;
}

export async function getTasks() {

  const { data, error } =
    await supabase
      .from("tasks")
      .select("*")
      .order(
        "created_at",
        {
          ascending: false,
        }
      );

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteTask(
  id: string
) {

  const { error } =
    await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

  if (error) {
    throw error;
  }
}

export async function updateTaskStatus(
  id: string,
  status: string
) {

  const { error } =
    await supabase
      .from("tasks")
      .update({
        status,
      })
      .eq("id", id);

  if (error) {
    throw error;
  }
}

export async function uploadProductImage(
  file: File
) {

  const fileName =
    `${Date.now()}-${file.name}`;

  const { error } =
    await supabase.storage
      .from("products")
      .upload(
        fileName,
        file
      );

  if (error) {
    throw error;
  }

  const {
    data,
  } = supabase.storage
    .from("products")
    .getPublicUrl(
      fileName
    );

  return data.publicUrl;
}

export async function uploadGeneratedImage(
  file: File
) {

  const fileName =
    `${Date.now()}-${file.name}`;

  const { error } =
    await supabase.storage
      .from("generated-images")
      .upload(
        fileName,
        file
      );

  if (error) {
    throw error;
  }

  const {
    data,
  } = supabase.storage
    .from("generated-images")
    .getPublicUrl(
      fileName
    );

  return data.publicUrl;
}

export async function submitGeneratedImage(
  taskId: string,
  imageUrl: string
) {

  const { error } =
    await supabase
      .from("generated_images")
      .insert([
        {
          task_id: taskId,
          image_url: imageUrl,
        },
      ]);

  if (error) {
    throw error;
  }
}

export async function getGeneratedImages() {

  const { data, error } =
    await supabase
      .from("generated_images")
      .select("*")
      .order(
        "created_at",
        {
          ascending: false,
        }
      );

  if (error) {
    throw error;
  }

  return data;
}

export async function createActivityLog(
  action: string
) {

  console.log(
    "Creating Log:",
    action
  );

  const { data, error } =
    await supabase
      .from("audit_logs")
      .insert([
        {
          action,
        },
      ])
      .select();

  console.log(
    "LOG DATA:",
    data
  );

  console.log(
    "LOG ERROR:",
    error
  );

  if (error) {
    throw error;
  }
}