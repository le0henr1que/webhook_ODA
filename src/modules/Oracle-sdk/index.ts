import { Router } from "express";
import { resolver } from "../../shared/error/appError";
import { handleBotResponse } from "../../middlewares/fromOdaToWhatsapp/fromOdaToWhatsappMiddleware";

const oracleRouter = Router();

oracleRouter.post("/bot/message", handleBotResponse);

export { oracleRouter };
