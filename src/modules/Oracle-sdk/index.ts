import { Request, Response, Router } from "express";
import { resolver } from "../../shared/error/appError";
import { handleBotResponse } from "../../middlewares/fromOdaToWhatsapp/fromOdaToWhatsappMiddleware";

const oracleRouter = Router();

oracleRouter.post("/bot/message", handleBotResponse);

oracleRouter.post(
  "/simulator/bot/message",
  (request: Request, response: Response) => {
    // handleBotResponse(request, response);
    console.log("Simulator Bot Message");
    console.log("Simulator Bot Message");
  }
);

export { oracleRouter };
