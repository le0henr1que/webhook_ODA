import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error/errorMiddleware";
import { corsOptions } from "./config/cors/config";

import { defineRouterWebhook } from "./modules/webhook/index";

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

app.use(defineRouterWebhook);

app.use(errorMiddleware);

export { app };