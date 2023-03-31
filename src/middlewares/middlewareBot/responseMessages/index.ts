import env from "../../../config/environment/config";
import { WebhookConfig  } from "../../../@types";
import OracleBot from '@oracle/bots-node-sdk';
import { Request, Response, NextFunction } from "express";

const { WebhookClient, WebhookEvent } = OracleBot.Middleware;

export function handleBotResponse(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const webhook: WebhookConfig = req.webhook;
  
    webhook
      .on(WebhookEvent.MESSAGE_RECEIVED, (message: any) => {
        console.log('Chatbot message:', message);
        res.send(message);
      });
  
    webhook.receiver()(req, res, next);
  }