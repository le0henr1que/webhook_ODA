import env from "../../../config/environment/config";
import { WebhookConfig  } from "../../../@types";
import OracleBot from '@oracle/bots-node-sdk';
import { Request, Response, NextFunction } from "express";
import axios from "axios";

const { WebhookClient, WebhookEvent } = OracleBot.Middleware;

export function handleBotResponse(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const webhookChannel: WebhookConfig = {
      channel: {
        url: env.webHookClient,
        secret: env.secretWebhookClient
      }
    }
    // console.log(env.secretWebhookClient)
    
    const webhook = new WebhookClient(webhookChannel);
  
    webhook
      .on(WebhookEvent.ERROR, (err: { message: any }) => {
        console.log('Webhook Error:', err.message)
      })
      .on(WebhookEvent.MESSAGE_SENT, (message: any) => {
          console.log('Message to chatbot BOOTBOOT:', message)
          console.log(message)
        }
      )
      .on(WebhookEvent.MESSAGE_RECEIVED, receivedMessage => {
        console.log('Received a message from ODA, processing message before sending to WhatsApp.');
        console.log(receivedMessage.messagePayload);
        
            
            const token = env.whatsappToken;

            axios.post('https://graph.facebook.com/v16.0/108061832249283/messages', {
              messaging_product: 'whatsapp',
              to: "5511996000822",
              text: {
                //@ts-ignore
                body: receivedMessage.messagePayload.text
              }
              
            }, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            })
    
        // your message processing logic here
      });
  

    webhook.receiver()(req, res, next);
  }