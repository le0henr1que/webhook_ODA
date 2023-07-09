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
        // console.log("------------------------------>>>>")
        console.log(JSON.stringify(receivedMessage))
        const token = env.whatsappToken;

        // axios.post(
        //   `https://graph.facebook.com/v16.0/${phon_no_id}/messages`,
        //   {
        //     messaging_product: "whatsapp",
        //     to: from,
        //     text: {
        //       body: receivedMessage.messagePayload.text,
        //     },
        //   },
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //       "Content-Type": "application/json",
        //     },
        //   }
        // );
        try {
          const payload = {
            messaging_product: 'whatsapp',
            to: from,
            text: {
              body: receivedMessage.messagePayload.text,
            },
            buttons: [
              {
                type: 'postback',
                title: 'Botão 1',
                payload: 'payload1',
              },
              {
                type: 'postback',
                title: 'Botão 2',
                payload: 'payload2',
              },
            ],
          };
      
          const response = axios.post(
            `https://graph.facebook.com/v16.0/${phon_no_id}/messages`,
            payload,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );
      
          // console.log(response.data);
        } catch (error) {
          console.error('Erro ao enviar a mensagem:', error);
        }
      }
    );

  webhook.receiver()(req, res, next);
}
