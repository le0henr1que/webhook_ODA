import { Response, Request } from "express";
import { HttpError } from "../../../../shared/error/appError";
import { FromOdaToWhatsappUseCase } from "./fromOdaToWhatsappUseCase";
import { callbackFromApiSide } from "../../../../@types";

export class FromOdaToWhatsappController {
  constructor(private fromOdaToWhatsapp: FromOdaToWhatsappUseCase) {}

  async handle(request: Request, response: Response): Promise<any> {

  await this.fromOdaToWhatsapp.execute()

  }
}