import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error/errorMiddleware";
import { corsOptions } from "./config/cors/config";
const OracleBot = require('@oracle/bots-node-sdk');
import { defineRouterWebhook } from "./modules/webhook/index";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
OracleBot.init(app);
app.use(cors(corsOptions));
app.use(defineRouterWebhook);
app.use(errorMiddleware);

export { app };