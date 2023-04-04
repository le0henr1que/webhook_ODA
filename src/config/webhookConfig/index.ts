import OracleBot from "@oracle/bots-node-sdk";
import { WebhookConfig } from "../../@types";
import env from "../environment/config";

export function WebhookOracleSdk() {
  const { WebhookClient } = OracleBot.Middleware;

  const webhookChannel: WebhookConfig = {
    channel: {
      url: env.webHookClient,
      secret: env.secretWebhookClient,
    },
  };

  //@ts-ignore
  const webhook = new WebhookClient(webhookChannel);

  return webhook;
}
