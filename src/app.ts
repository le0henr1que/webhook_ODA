import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error/errorMiddleware";
import { corsOptions } from "./config/cors/config";
import OracleBot from "@oracle/bots-node-sdk";
import { oracleRouter } from "./modules/Oracle-sdk";
import { whatsappRouter } from "./modules/WhatsApp";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
OracleBot.init(app);
app.use(cors(corsOptions));
app.use(oracleRouter);
app.use(whatsappRouter);
app.use(errorMiddleware);

export { app };
