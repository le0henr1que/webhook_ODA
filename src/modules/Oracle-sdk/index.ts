import { Request, Response, Router } from "express";
import { resolver } from "../../shared/error/appError";
import { handleBotResponse } from "../../middlewares/fromOdaToWhatsapp/fromOdaToWhatsappMiddleware";

const oracleRouter = Router();

oracleRouter.post("/bot/message", handleBotResponse);

oracleRouter.post(
  "/simulator/bot/message",
  handleBotResponse,
  (request: Request, response: Response) => {
    response.send("message send");
  }
);

export { oracleRouter };
