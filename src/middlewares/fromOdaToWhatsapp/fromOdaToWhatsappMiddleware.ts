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

async function sendMensagemFromWhatsapp(payloadSend:any){

  await axios
  .post(
    `https://graph.facebook.com/v16.0/${phon_no_id}/messages`,
    payloadSend,
    {
      headers: {
        Authorization: `Bearer ${env.whatsappToken}`,
        "Content-Type": "application/json",
      },
    }
  )
  .then((response) => {
    // Lógica para lidar com a resposta da solicitação POST
    // console.log(response)

  })
  .catch((error) => {
    // console.log(error)
    // Lógica para lidar com erros na solicitação POST
  });
}

export function handleBotResponse(req: Request, res: Response, next: NextFunction) {
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
      (receivedMessage: {
        number: any;
        messagePayload: { actions: any[]; text: string };
      }) => {
        console.log("Received a message from ODA, processing message before sending to WhatsApp.");
        const contentMessage: any = {
          messaging_product: "whatsapp",
          to: from, 
        };
        
        const interactive: any = {
          type: "list",
          header: {
            type: "text",
            text: "",
          },
          body: {
            text: receivedMessage.messagePayload.text,
          },
          footer: {
            text: "",
          },
        };
        
        console.log("-------- quick reply ------->");
        console.log(receivedMessage);
        console.log("-------- end ------->");
        
        if (!receivedMessage.messagePayload.actions || receivedMessage.messagePayload.actions.length === 0) {
          contentMessage.text = { body: receivedMessage.messagePayload.text };
        }
        
        if (receivedMessage.messagePayload.actions) {
          contentMessage.type = "interactive";
          interactive.type = "button";
          interactive.action = { buttons: [] };
        
          receivedMessage.messagePayload.actions.forEach((content: any, index: number) => {
            const button: any = {
              type: "reply",
              reply: {
                id: content.label,
                title: content.label,
              }
            };
        
            interactive.action.buttons.push(button);
        
            // Verifica se já adicionou 3 botões ou se é o último item do loop
            if (interactive.action.buttons.length === 3 || index === receivedMessage.messagePayload.actions.length - 1) {
              const payloadSend: any = {
                ...contentMessage,
                interactive: { ...interactive },
              };
        
              // Verifica se ainda existem botões para serem enviados
              if (index < receivedMessage.messagePayload.actions.length - 1) {
                payloadSend.interactive.body.text = "Mais alternativas para escolher:";
              }
        
              sendMensagemFromWhatsapp(payloadSend);
        
              // Limpa os botões para a próxima remessa
              interactive.action.buttons = [];
            }
          });
        } else {
          const payloadSend: any = contentMessage;
          sendMensagemFromWhatsapp(payloadSend);
        }
      }
    );

  webhook.receiver()(req, res, next);
}
