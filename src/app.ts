import express, { Application } from "express";
import globalErrorHandler from "./middleware/globalErrorHandler";
import router from "./routes";

export const app: Application = express()

app.use(express.json())

//middleware
app.use(globalErrorHandler)

//routes
app.use('/api', router)