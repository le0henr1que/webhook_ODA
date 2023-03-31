import env from "../../../config/environment/config";
import { WebhookConfig } from "../../../@types";
import OracleBot from '@oracle/bots-node-sdk';
import { Request, Response, NextFunction } from "express";

const { WebhookClient, WebhookEvent } = OracleBot.Middleware;

export function receiveBotMessage(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    
    console.log(env.webHookClient)

    const webhookChannel: WebhookConfig = {
      channel: {
        url: env.webHookClient,
        secret: env.secretWebhookClient
      }
    }
    
    const webhook = new WebhookClient(webhookChannel);
  
    webhook
      .on(WebhookEvent.ERROR, (err: { message: any }) => console.log('Webhook Error:', err.message))
      .on(WebhookEvent.MESSAGE_SENT, (message: any) => console.log('Message to chatbot:', message));
  
    req.webhook = webhook;
  
    next();
  }
  