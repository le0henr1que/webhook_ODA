

import { Router } from "express"
import { resolver } from "../../shared/error/appError";
import { processWebhookController } from "./useCase/processWebhook"
import { verifyCallbackController } from "../webhook/useCase/verifyCallback"
import { handleBotResponse, receiveBotMessage } from "../../middlewares/middlewareBot"

const defineRouterWebhook = Router();

defineRouterWebhook.post("/webhook", resolver((request, response) => {
    return processWebhookController.handle(request, response);
  })
);

defineRouterWebhook.post("/bot/message", receiveBotMessage, handleBotResponse)

defineRouterWebhook.get("/webhook", resolver((request, response) => {
    return verifyCallbackController.handle(request, response);
  })
);

export { defineRouterWebhook }