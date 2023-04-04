import env from "../../../../config/environment/config";
import { callbackFromApiSide } from "../../../../@types";

export class VerifyCallbackUseCase {
  async execute(callbackApiSide: callbackFromApiSide): Promise<boolean> {
    const { mode, token } = callbackApiSide;
    const myToken = env.myTokenWhatsapp;
    console.log(myToken);

    if (!mode) return false;
    if (!token) return false;
    if (!myToken) return false;
    if (mode == "subscribe" && token == myToken) return true;
    return false;
  }
}
