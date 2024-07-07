import { Router } from "express";
import { resolver } from "../../shared/error/appError";
import { processWebhookController } from "./useCase/fromWhatsappToOda";
import { verifyCallbackController } from "./useCase/verifySubscription";

const whatsappRouter = Router();

whatsappRouter.get(
  "/webhook",
  resolver((request, response) => {
    return verifyCallbackController.handle(request, response);
  })
);

whatsappRouter.post(
  "/webhook",
  resolver((request, response) => {
    return processWebhookController.handle(request, response);
  })
);

export { whatsappRouter };
