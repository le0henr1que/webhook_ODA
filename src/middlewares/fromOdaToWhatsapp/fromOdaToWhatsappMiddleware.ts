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

        
        // const actionsQuikReply = receivedMessage.messagePayload.actions;
        console.log("-------- quik reply ------->")
        // console.log(receivedMessage.messagePayload.actions)
        // console.log(receivedMessage.messagePayload.actions.length)
        // console.log(receivedMessage.messagePayload)
        console.log(receivedMessage)
        console.log("-------- end------->")

        if (!receivedMessage.messagePayload.actions || receivedMessage.messagePayload.actions.length === 0) {
          contentMessage.text = { body: receivedMessage.messagePayload.text };
        }
        if (receivedMessage.messagePayload.actions){
          
        if (receivedMessage.messagePayload.actions.length > 0 && receivedMessage.messagePayload.actions.length <= 3) {
          contentMessage.type = "interactive";
          interactive.type = "button";

          interactive.action = { buttons: [] };

          receivedMessage.messagePayload.actions.forEach((content: any) => {
            const button: any = {
              type: "reply",
              reply: {
                id: content.label,
                title: content.label,
              },
            };

            interactive.action.buttons.push(button);
          });
          // console.log(interactive);
        }
       
          if (receivedMessage.messagePayload.actions.length > 3) {
            contentMessage.type = "interactive";
            interactive.type = "list";

            interactive.action = { button: "Clique p/ selecionar" };
            interactive.action.sections = [
              {
                title:" ",
                rows: [],
              },
            ];
            receivedMessage.messagePayload.actions.forEach((content: any) => {
              const button: any = {
                type: "reply",
                reply: {
                  id: content.label,
                  title: "Selecionar",
                },
              };
            
              interactive.action.buttons.push(button);
            
              const payloadSend: any = {
                messaging_product: "whatsapp",
                to: from,
                type: "interactive",
                interactive: {
                  type: "button",
                  header: {
                    type: "text",
                    text: "",
                  },
                  body: {
                    text: content.label,
                  },
                  footer: {
                    text: "",
                  },
                  action: {
                    buttons: [button],
                  },
                },
              };
            
       
              axios
              .post(
                `https://graph.facebook.com/v16.0/${phon_no_id}/messages`,
                payloadSend,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
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
            });
            // receivedMessage.messagePayload.actions.forEach((content: any) => {
            //   const button: any = {
            //     id: content.label,
            //     title: " ",
            //     description: content.label
            //   };

            //   interactive.action.sections[0].rows.push(button);
            // });
            // console.log(interactive);
          }
        }
        const token = env.whatsappToken;
        let payloadSend: any = {}

        if(!receivedMessage.messagePayload.actions){
          payloadSend = contentMessage 
        }
        if(receivedMessage.messagePayload.actions){
          payloadSend = {...contentMessage, interactive} 
        }

        axios
          .post(
            `https://graph.facebook.com/v16.0/${phon_no_id}/messages`,
            payloadSend,
            {
              headers: {
                Authorization: `Bearer ${token}`,
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
    );

  webhook.receiver()(req, res, next);
}
