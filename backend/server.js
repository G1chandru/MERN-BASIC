// XWucoB4900w1h2dE;
//   "mongodb+srv://stalinkumanan:VXE6nl7ch44fxSIw@rest.b0tzz.mongodb.net/"

import express from "express";
import connectDB from "./config/db.js";
import { errorHandler, notfound } from "./middleware/errorMiddleware.js";
import router from "./routes/userRoutes.js";
import  todorouter   from "./routes/todoRoutes.js";
import cors from "cors";

const app = express();
connectDB()
 
const corsOptions = {
       origin:"http://localhost:4000",
       methods:"GET,HEAD,PUT,PATCH,POST,DELETE"
}


// Middleware
app.use(cors(corsOptions));
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:4000"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", router);
app.use("/api/users", todorouter);

app.get("/",(req,res)=>{
     res.send("SUccessfuly")
})


app.use(notfound)
app.use(errorHandler)
app.listen(4000,()=>{
     console.log("http://localhost:4000");
})