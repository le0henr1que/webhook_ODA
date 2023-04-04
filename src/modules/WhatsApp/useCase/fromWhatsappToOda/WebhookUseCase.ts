
import env from "../../../../config/environment/config"
import axios from 'axios';
import OracleBot from '@oracle/bots-node-sdk';
import { WebhookConfig } from "../../../../@types";


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
    //@ts-ignore
    this.webhook = new WebhookClient(webhookChannel);
  }


 

  public async handleWebhook(payload:any):Promise<boolean> {
    console.log("entrou")
    
    let body_param = payload;
    // console.log(JSON.stringify(body_param, null, 2));
    console.log(body_param.object)
    console.log("teste")
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
        console.log('Ansh your Message before sending to ODA is ------>');
        console.log(this.webhook)

        await this.webhook.send(message);
        
        // res.sendStatus(200);
        return true

      } 

      console.log("Side")
      return false
      
    }
    console.log("Outside")
    return false
  }
   
  }
