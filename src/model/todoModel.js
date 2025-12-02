import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  owner: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
}, { timestamps: true })

const Todo = mongoose.models.todos || mongoose.model("todos", todoSchema);

export default Todo