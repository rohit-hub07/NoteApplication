"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function CreateTask() {
  const [title, setTitle] = useState<String>();
  const [description, setDescription] = useState<String>();
  const router = useRouter()
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/todo/createtodo", { title, description });
      console.log(res.data);
      if (res.data?.success) {
        toast.success(res?.data?.message || "Task created successfully!")
        router.push("/home")
      } else {
        toast.error(res.data?.message || "Failed to create task!");
      }
    } catch (error: any) {
      console.error("Create task error:", error);
      toast.error(error.response?.data?.message || "Error creating task!");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="block">
      <label className="block text-white text-3xl text-center">Title</label>
      <input onChange={(e) => setTitle(e.target.value)} name="title" required type="text" className="border rounded-2xl h-10 w-50" placeholder="Enter Title" />
      <label className="block text-white text-3xl text-center">Description</label>
      <textarea onChange={(e) => setDescription(e.target.value)} name="title" required className="block text-white border rounded-2xl h-50 w-60" placeholder="Enter Description" />
      <button type="submit" className="w-30 border rounded-2xl mt-10">Submit</button>
    </form>
  )
}