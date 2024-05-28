import express from "express";
import "express-async-errors";
import "dotenv/config";
import cors from "cors";

import ErrorHandlerMiddlerware from "./middlewares/error-handler.js";
import NotFoundMiddleware from "./middlewares/not-found.js";
import tasksRouter from "./routes/tasksRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/tasks", tasksRouter);

app.use(NotFoundMiddleware);
app.use(ErrorHandlerMiddlerware);

const PORT = process.env.PORT | 4000;
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT} `);
  });
};

startServer();
