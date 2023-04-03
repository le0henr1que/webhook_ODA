
import api from "../../../../service/api"
import env from "../../../../config/environment/config"
import axios from 'axios';
import OracleBot from '@oracle/bots-node-sdk';
import { WebhookConfig } from "../../../../@types";
import e from "express";

const { WebhookClient, WebhookEvent } = OracleBot.Middleware;

export class WebhookUseCase {
  private webhook: WebhookConfig;
  private phon_no_id: string;
  private from: string;

  constructor() {
    const webhookChannel: WebhookConfig = {
      channel: {
        url: env.webHookClient,
        secret: env.secretWebhookClient
      }
    }
    
    this.webhook = new WebhookClient(webhookChannel);
  

    this.webhook.on(WebhookEvent.MESSAGE_RECEIVED, this.handleMessageReceived.bind(this));
  }

  private async handleMessageReceived(recievedMessage:any) {
    console.log('Received a message from ODA, processing message before sending to WhatsApp. *****************>');
    console.log(recievedMessage.messagePayload.text);

    const { phon_no_id, from } = this;
    const token = env.whatsappToken;

    axios.post('https://graph.facebook.com/v16.0/108061832249283/messages', {
      messaging_product: 'whatsapp',
      to: '5511993074751',
      type: 'template',
      template: {
        name: 'hello_world',
        language: {
          code: 'en_US'
        }
      }
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
  }

  public async handleWebhook(payload:any):Promise<boolean> {
    console.log("entrou")
    
    let body_param = payload;

    console.log(JSON.stringify(body_param, null, 2));
    if (body_param.object) {

      console.log('Ansh i am inside body');
      if (
        body_param.entry &&
        body_param.entry[0].changes &&
        body_param.entry[0].changes[0].value.messages &&
        body_param.entry[0].changes[0].value.messages[0]
      ) {
        this.phon_no_id = body_param.entry[0].changes[0].value.metadata.phone_number_id;
        this.from = body_param.entry[0].changes[0].value.messages[0].from;
        let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;
        let userName = body_param.entry[0].changes[0].value.contacts[0].profile.name;
        console.log('Ansh i am inside details -------------------------------------->');
        console.log('phone number ' + this.phon_no_id);
        console.log('from ' + this.from);
        console.log('Message from sender is --> ' + msg_body);
        console.log('User name of the sender-->' + userName);
        // Ansh Sending Message from Whats app to ODA
        const MessageModel = this.webhook.MessageModel();
        const message = {
          userId: 'anonymous',
          profile: { firstName: userName, lastName: this.from },
          messagePayload: MessageModel.textConversationMessage(msg_body)
        };
        console.log('Ansh your Message before sending to ODA is ------>' + message);
        await this.webhook.send(message);
        // res.sendStatus(200);
        return true

      } 

      return false
      
    }
    return false
  }
   
  }
