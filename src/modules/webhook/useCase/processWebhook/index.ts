
import { ProcessWebhookController } from "./WebhookController";
import { WebhookUseCase } from "./WebhookUseCase";


const processWebhookUseCase = new WebhookUseCase();

const processWebhookController = new ProcessWebhookController(processWebhookUseCase);

export { processWebhookUseCase, processWebhookController };