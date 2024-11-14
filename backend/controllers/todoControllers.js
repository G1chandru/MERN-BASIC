import asyncHandler from "express-async-handler";
import Todo from "../models/todoModel.js";
import User from "../models/userModel.js";
// Get all todos
const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Create a new todo
const createTodo = asyncHandler(async (req, res) => {
  const { note } = req.body;
  const todo = await Todo.create({note});
  res.status(201).json({
    _id: todo._id,
    note
  });

});

// Update a todo
const updateTodo = asyncHandler(async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    { note: req.body.note },
    {
      new: true,
    }
  );

  if (!updatedTodo) {
    res.status(404);
    throw new Error("Todo not found");
  }
  // Fetch the updated list of todos and return it
  const todos = await Todo.find();
  res.json(todos);
});


// Delete a todo
const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {  
     const todo = await Todo.findByIdAndDelete(id);  
    if (!todo) {
      console.log("Todo not found");
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json({ message: "Todo deleted" });
  } catch (error) {
  
    res
      .status(500)
      .json({ message: "Failed to delete todo", error: error.message });
  }
});





export { getTodos, createTodo, updateTodo, deleteTodo };


