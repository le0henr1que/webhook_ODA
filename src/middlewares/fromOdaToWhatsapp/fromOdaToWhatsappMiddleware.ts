import env from "../../config/environment/config";
import { WebhookConfig } from "../../@types";
import OracleBot from "@oracle/bots-node-sdk";
import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { WebhookOracleSdk } from "../../config/webhookConfig/index";
import {
  from,
  phon_no_id,
} from "../../modules/WhatsApp/useCase/fromWhatsappToOda/WebhookUseCase";

const { WebhookClient, WebhookEvent } = OracleBot.Middleware;

export function handleBotResponse(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const webhook: any = WebhookOracleSdk();

  webhook
    .on(WebhookEvent.ERROR, (err: { message: any }) => {
      console.log("Webhook Error:", err.message);
    })
    .on(WebhookEvent.MESSAGE_SENT, (message: any) => {
      console.log("Message to chatbot BOOT-BOOT:", message);
    })
    .on(
      WebhookEvent.MESSAGE_RECEIVED,
      (receivedMessage: { number: any; messagePayload: { text: any } }) => {
        console.log(
          "Received a message from ODA, processing message before sending to WhatsApp."
        );
        console.log(receivedMessage +" mensagem recebida pelo ODA")
        const token = env.whatsappToken;

        axios.post(
          `https://graph.facebook.com/v16.0/${phon_no_id}/messages`,
          {
            messaging_product: "whatsapp",
            to: from,
            text: {
              body: receivedMessage.messagePayload.text,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }
    );

  webhook.receiver()(req, res, next);
}
