import express,{Request,Response} from "express";
import cors from "cors";
import { clerkMiddleware, getAuth } from '@clerk/express'
import { AuthenticateUser } from "../middlewares/authMiddleware.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3002", "http://localhost:3003"],
    credentials: true,
  })
);

app.use(clerkMiddleware())

app.get("/health",(req:Request,res:Response) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now()
  })
});

app.get("/test",AuthenticateUser,(req,res)=> {
  res.json({message:"product service authenticated"})
})

app.listen(8000,() => {
  console.log("Product Service is running on : http://localhost:8000");
});
