import { Response, Request } from "express";
import { HttpError } from "../../../../shared/error/appError";
import { VerifyCallbackUseCase } from "./VerifyCallbackUseCase";
import api from "../../../../service/api"
import { callbackFromApiSide } from "../../../../@types";

export class VerifyCallbackController {
  constructor(private verifyCallback: VerifyCallbackUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {

    let mode = typeof request.query["hub.mode"] === "string" ? request.query["hub.mode"] : "";;
    let challange = typeof request.query["hub.challenge"] === "string" ? request.query["hub.challenge"] : "";
    let token = typeof request.query["hub.verify_token"] === "string" ? request.query["hub.verify_token"] : "";

    const callbackApiSide: callbackFromApiSide = {
      mode, 
      challange, 
      token
    }
    // console.log(callbackApiSide)

    const responseCallback = await this.verifyCallback.execute(callbackApiSide);


    if(!responseCallback){
      response.status(403);
    }

    return response.status(200).send(challange);
  }
}