import env from "../../config/environment/config";
import { WebhookConfig } from "../../@types";
import OracleBot from "@oracle/bots-node-sdk";
import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { WebhookOracleSdk } from "../../config/webhookConfig/index";
import { json } from "body-parser";
import {
  from,
  phon_no_id,
} from "../../modules/WhatsApp/useCase/fromWhatsappToOda/WebhookUseCase";

const { WebhookClient, WebhookEvent } = OracleBot.Middleware;


export async function handleBotResponse(req: Request, res: Response, next: NextFunction) {
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
      async (receivedMessage: {
        number: any;
        messagePayload: { actions: any[]; text: string };
      }) => {
        // const { receivedMessage, from, phon_no_id } = req.body

          async function sendMessage(payload:any){
            return await axios.post(
              `https://graph.facebook.com/v16.0/${phon_no_id}/messages`,
              payload,
              {
                headers: {
                  Authorization: `Bearer ${env.whatsappToken}`,
                  "Content-Type": "application/json",
                },
              }
            )
            
          }
          
       

        console.log("Received a message from ODA, processing message before sending to WhatsApp.");

        let contentMessage: any = {
          messaging_product: "whatsapp",
          to: from, 
        };

        let interactive: any = {
          body: {
            text: receivedMessage.messagePayload.text,
          },
        };

        async function buildPayloadWhatsapp(messageList:string[], listButton:boolean){
          contentMessage.type = "interactive";
          contentMessage.interactive = interactive;
          contentMessage.interactive.type = "";
          contentMessage.interactive.action = {};

       
          if(listButton && messageList.length > 3){
            
            await sendMessage({  
              messaging_product: "whatsapp",
              to: from,
              text: {
                body: receivedMessage.messagePayload.text,
              }
            });
            
            for (const content of messageList) {
              contentMessage.interactive.type = "button"
              contentMessage.interactive.action.buttons = [{}];
              contentMessage.interactive.action.buttons[0] = {
                type: "reply",
                reply: { id: "Selecionar", title: "Selecionar" }
              };
              console.log(JSON.stringify(contentMessage) );
              contentMessage.interactive.body.text = content
              await sendMessage(contentMessage);
            }
            return
          }

          if(messageList.length <= 3){
            console.log("Aqui ta caindo, dentro da functin")
            contentMessage.interactive.type = "button"
            contentMessage.interactive.action.buttons = messageList.map((content) => {
              return {
                type: "reply",
                reply: { id: content, title: content }
              };
            });

            return sendMessage(contentMessage)
          }

          if(messageList.length > 3){
            contentMessage.interactive.type = "list"
            contentMessage.interactive.action.button =  "Clique p/ selecionar"
            interactive.action.sections = [{}]
            interactive.action.sections[0].title = ""
            interactive.action.sections[0].rows = messageList.map((content) => {
              return {
                id: content,
                title: " ",
                description: content
              };
            });
            console.log(JSON.stringify(contentMessage))
            return sendMessage(contentMessage)
            
          }
          return false
        }
        
        function errorMessage(){
          contentMessage.type = "interactive";
          contentMessage.interactive = interactive;
          contentMessage.interactive.type = "button";
          contentMessage.interactive.action = {};
          contentMessage.interactive.body.text = "Ocorreu um erro inesperado, Clique no botão 'Reiniciar' e tente novamente"
          contentMessage.interactive.action.buttons = [{
              type: "reply",
              reply: { id: "Reiniciar", title: "Reiniciar" }
            }]
          sendMessage(contentMessage)
          console.log(`Parece que ocorreu um erro ao enviar a mensagem de: ${from}`)
        }
    

          let valueForSending:any[] = []
          
          if (!receivedMessage.messagePayload.actions?.length) {
            valueForSending = ["Cancelar"]
          }
          valueForSending = await receivedMessage.messagePayload.actions.map((content: any) => content.label);
    

          // await buildPayloadWhatsapp(valueForSending, false)
          // a função a baixo retorna os dados por meio de um botão
          buildPayloadWhatsapp(valueForSending, true)
          .then(content => console.log("Mensagem enviada com sucesso!!"))
          .catch((err) => {
            errorMessage()
            console.log(err.message)
          })

    
     
        
      }
    );

  webhook.receiver()(req, res, next);
}
