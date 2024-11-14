import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controllers/todoControllers.js";

const todorouter = express.Router();


todorouter.get("/gettodo", getTodos);
todorouter.post("/createtodo", createTodo);
todorouter.put("/updatetodo/:id", updateTodo);
todorouter.delete("/deletetodo/:id", deleteTodo);


export default todorouter;