"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CreateTask() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/todo/createtodo", { title, description });
      if (res.data?.success) {
        toast.success(res?.data?.message || "Task created successfully!");
        router.push("/home");
      } else {
        toast.error(res.data?.message || "Failed to create task!");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error creating task!");
    }
  };

  return (
    <div className="min-h-[70vh] grid place-items-center px-4">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Create a new task</CardTitle>
          <CardDescription>Give it a clear title and a helpful description.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a concise title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add details that will help you act on this task"
                required
                className="min-h-28 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              />
            </div>
          </CardContent>
          <CardFooter className="justify-end gap-3 border-t pt-6">
            <Button type="button" variant="outline" onClick={() => router.push("/home")}>Cancel</Button>
            <Button type="submit">Create Task</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}