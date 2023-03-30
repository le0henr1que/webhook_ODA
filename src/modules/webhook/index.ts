

import { Router } from "express"
import { resolver } from "../../shared/error/appError";
import { processWebhookController } from "./useCase/processWebhook"

const defineRouterWebhook = Router();

defineRouterWebhook.post("/webhook", resolver((request, response) => {
    return processWebhookController.handle(request, response);
  })
);

export { defineRouterWebhook }