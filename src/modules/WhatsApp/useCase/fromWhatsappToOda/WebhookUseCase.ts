import env from "../../../../config/environment/config";
import axios from "axios";
import OracleBot from "@oracle/bots-node-sdk";
import { WebhookConfig } from "../../../../@types";
import { WebhookOracleSdk } from "../../../../config/webhookConfig";

const { WebhookClient, WebhookEvent } = OracleBot.Middleware;


export let phon_no_id: string;
export let from: string;

export class WebhookUseCase {
  public async handleWebhook(payload: any): Promise<boolean> {

    const webhook: any = await WebhookOracleSdk();

    if (!payload.object) return false;
    if (!payload.entry) return false;
    if (!payload.entry[0].changes) return false;
    if (!payload.entry[0].changes[0].value.messages) return false;
    if (!payload.entry[0].changes[0].value.messages[0]) return false;

    phon_no_id = payload.entry[0].changes[0].value.metadata.phone_number_id;
    from = payload.entry[0].changes[0].value.messages[0].from;

    let msg_body = payload.entry[0].changes[0].value.messages[0].text.body;
    let userName = payload.entry[0].changes[0].value.contacts[0].profile.name;

    //Sending Message from Whats app to ODA
    const MessageModel = webhook.MessageModel();

    const message = {
      userId: "anonymous",
      profile: { firstName: userName, lastName: from },
      messagePayload: MessageModel.textConversationMessage(msg_body),
    };

    await webhook.send(message);

    return true;
  }
}
