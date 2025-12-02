"use client";

import axios from "axios";
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast";

export default function HomePage() {

  interface Task {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
  }


  const [task, setTask] = useState<Task[]>([]);
  useEffect(() => {
    getTask();
  }, [])

  const getTask = async () => {
    const res = await axios.get("api/todo/showtodo")
    console.log("res.data.alltasks: ",res.data.alltasks)
    setTask(res.data.alltasks);
  }
  const deleteTask = async (id: string) => {
    console.log("Id before calling the delete api: ", id)
    const res = await axios.delete(`/api/todo/deletetodo/${id}`);
    console.log("res.data inside of the delete: ", res.data);
    if (res.data.success) {
      setTask(task.filter((t) => t._id !== id));
    }
    toast.success(res?.data?.message)
  }

  return (
    <div>
      {task.length > 0 ? task?.map((el) => {
        return (
          <div key={el._id} className="p-4 border rounded-lg shadow-sm bg-white max-w-sm">
            <h2 className="text-xl font-semibold mb-2">{el.title}</h2>
            <p className="text-gray-700 mb-3">{el.description}</p>
            <p className="text-sm text-gray-500">Created At: {new Date(el.createdAt).toLocaleString()}</p>
            <button onClick={() => deleteTask(el._id)}><i className="fa-solid bg-red-500 fa-delete-left"></i></button>
          </div>
        )
      }): (<><h1>No tasks!</h1></>)}
    </div>
  )
}