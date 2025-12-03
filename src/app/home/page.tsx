"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Trash2, Plus } from "lucide-react";
import { useAuth } from "../context/userContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const auth = useAuth();
  if (!auth) return null;
  const { userId } = auth;

  interface Task {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
  }

  const [task, setTask] = useState<Task[]>([]);

  useEffect(() => {
    getTask();
  }, []);

  const getTask = async () => {
    const res = await axios.get("api/todo/showtodo");
    setTask(res.data.alltasks);
  };

  const deleteTask = async (id: string) => {
    const res = await axios.delete(`/api/todo/deletetodo/${id}`);
    if (res.data.success) {
      setTask((prev) => prev.filter((t) => t._id !== id));
    }
    toast.success(res?.data?.message);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Your Tasks</h1>
          <p className="text-muted-foreground mt-1">
            Manage your notes and to-dos in a clean, modern view.
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/createtask">
            <Plus className="size-4" /> Create Task
          </Link>
        </Button>
      </div>

      {userId && task.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {task.map((el) => (
            <Card
              key={el._id}
              className="group bg-card border border-border/50 hover:border-border transition-all duration-200 hover:shadow-lg"
            >
              <CardHeader className="pb-3">
                <CardTitle className="wrap-break-word text-base font-semibold text-card-foreground line-clamp-2">
                  {el.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground whitespace-pre-wrap wrap-break-word max-h-32 overflow-y-auto leading-relaxed [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {el.description}
                </p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>
                    {new Date(el.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </CardContent>

              <CardFooter className="pt-3">
                <Button
                  variant="destructive"
                  size="sm"
                  className="ml-auto gap-1.5"
                  type="button"
                  onClick={() => deleteTask(el._id)}
                  aria-label={`Delete ${el.title}`}
                >
                  <Trash2 className="size-3.5" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="max-w-md mx-auto text-center bg-card border border-border/50">
          <CardHeader className="pb-4">
            <div className="mx-auto mb-3 w-12 h-12 bg-muted rounded-full flex items-center justify-center">
              <Plus className="size-5 text-muted-foreground" />
            </div>
            <CardTitle className="text-lg font-semibold text-card-foreground">No tasks yet</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Create your first task to get started organizing your notes.
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-center">
            <Button asChild>
              <Link href="/createtask">Create Task</Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}