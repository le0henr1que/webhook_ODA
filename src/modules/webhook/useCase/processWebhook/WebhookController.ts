import { Response, Request } from "express";
import { HttpError } from "../../../../shared/error/appError";
import { WebhookUseCase } from "./WebhookUseCase";
import api from "../../../../service/api"

export class ProcessWebhookController {
  constructor(private processWebhook: WebhookUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const payload = request.body;
    const webhookController = new WebhookUseCase()

    const responseWpp = await this.processWebhook.handleWebhook(payload);
    const responseBind = await this.processWebhook.handleWebhook.bind(responseWpp)
    console.log(responseWpp)

    if(responseWpp){
      return response.sendStatus(200);
    }
    if(!responseWpp){
      return response.sendStatus(404);
    }
  }
}