
import env from "../../../../config/environment/config"
import { WebhookConfig } from "../../../../@types"
import OracleBot from '@oracle/bots-node-sdk';
import axios from "axios"

export class FromOdaToWhatsappUseCase {

  async execute():Promise<any> {

    const { WebhookClient, WebhookEvent } = OracleBot.Middleware;

    const webhookChannel: WebhookConfig = {
      channel: {
        url: env.webHookClient,
        secret: env.secretWebhookClient
      }
    }
    //@ts-ignore
    const webhook = new WebhookClient(webhookChannel);
    //@ts-ignore
    webhook.on(WebhookEvent.ERROR, (err: { message: any }) => {
      console.log('Webhook Error:', err.message)
    })
    .on(WebhookEvent.MESSAGE_SENT, (message: any) => {
        console.log('Message to chatbot BOOTBOOT:', message)
        console.log(message)
    })
    .on(WebhookEvent.MESSAGE_RECEIVED, (receivedMessage:any) => {
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
    
    });
    //@ts-ignore
    return webhook.receiver()

  }
}