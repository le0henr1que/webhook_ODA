import { Response, Request } from "express";
import { HttpError } from "../../../../shared/error/appError";
import { WebhookUseCase } from "./WebhookUseCase";
import api from "../../../../service/api"

export class ProcessWebhookController {
  constructor(private processWebhook: WebhookUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const payload = request.body;


    const responseWpp = await this.processWebhook.execute(payload);
    console.log(responseWpp.data)
    return response.status(201).json({ error: false, data:{responseWpp}});
  }
}