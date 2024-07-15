import express from "express";
import cors from "cors";
import appRouters from "./backend/routers/appRouters";

const app = express();
app.use(cors());
app.use("/appvtasystock",  appRouters);