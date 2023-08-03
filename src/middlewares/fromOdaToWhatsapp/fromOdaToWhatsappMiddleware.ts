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
  let webhookExecutado = false;
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
        messagePayload: {
          globalActions: any;
          type: string;
          cards: any; actions: any[]; text: string 
        };
      }) => {

        function delay(ms: number): Promise<void> {
          return new Promise((resolve) => setTimeout(resolve, ms));
        }
        if (!webhookExecutado) {
          webhookExecutado = true;
        }
        
          // const {phon_no_id, from, receivedMessage} = req.body
     
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
          
        // console.log("Received a message from ODA, processing message before sending to WhatsApp.");
        console.log(JSON.stringify(receivedMessage))

        let contentMessage: any = {
          messaging_product: "whatsapp",
          to: from, 
        };

        let interactive: any = {
          body: {
            text: receivedMessage.messagePayload.text,
          },
        };
        
        async function buildPayloadWhatsapp(messageList:any, listButton:string, isList:boolean){
         
          contentMessage.type = "interactive";
          contentMessage.interactive = interactive;
          contentMessage.interactive.type = "";
          contentMessage.interactive.action = {};
          contentMessage.interactive.body.text = receivedMessage.messagePayload.text
          
          console.log(messageList)
          // console.log("caiu dentro da build message com o array "+ JSON.stringify(contentMessage))
          console.log(messageList)
          if(messageList.length == 0){
            await sendMessage({  
              messaging_product: "whatsapp",
              to: from,
              text: {
                body:  contentMessage.interactive.body.text,
              }
            });
            return
          }
          // if(messageList.cards && !isList && listButton !== "list-for-wpp-list"){
            
          //   await sendMessage({  
          //     messaging_product: "whatsapp",
          //     to: from,
          //     text: {
          //       body: "Selecione um plano",
          //     }
          //   });
      
            
          //   for (const content of messageList.cards) {
          //   // console.log(messageList.cards)

          //     // console.log("Caindo no for se for pra mostrar uma mensagem e um botão com o array " + JSON.stringify(contentMessage))
          //     contentMessage.interactive.body.text = content.description
          //     contentMessage.interactive.header = {}
          //     contentMessage.interactive.header.type = "text"
          //     contentMessage.interactive.header.text = content.title
          //     contentMessage.interactive.type = "button"
          //     contentMessage.interactive.action.buttons = [{}];
          //     contentMessage.interactive.action.buttons[0] = {
          //       type: "reply",
          //       reply: { id: content.actions[0].label, title: "Selecionar plano" }
          //     };
          //     // console.log(contentMessage)
          //     await sendMessage(contentMessage);
          //     // console.log()
          //   }
          //   return
          // }

          if(messageList.length > 3){
            
            await sendMessage({  
              messaging_product: "whatsapp",
              to: from,
              text: {
                body: receivedMessage.messagePayload.text,
              }
            });
            // console.log(messageList)
            
            for (const content of messageList) {
            // console.log(messageList)

              // console.log("Caindo no for se for pra mostrar uma mensagem e um botão com o array " + JSON.stringify(contentMessage))
              contentMessage.interactive.body.text = content
              contentMessage.interactive.type = "button"
              contentMessage.interactive.action.buttons = [{}];
              contentMessage.interactive.action.buttons[0] = {
                type: "reply",
                reply: { id: content, title: "Selecionar" }
              };
              // console.log(contentMessage)
              await sendMessage(contentMessage);
              // console.log()
            }
            return
          }
       
          // if(listButton == "list-for-wpp-list" && isList && messageList.actions && messageList.actions.length <= 3){
            // console.log(messageList)
            // console.log("Caindo no list menor que três pra bostrar três botões com o array " + JSON.stringify(contentMessage))
            if(messageList.actions && messageList.actions.length <= 3){
              contentMessage.interactive.body.text = receivedMessage.messagePayload.text
              contentMessage.interactive.type = "button"
              contentMessage.interactive.action.buttons = messageList.actions.map((content:any) => {
                return {
                  type: "reply",
                  reply: { id: content.label, title: content.label }
                };
              });
            }
          
            if(messageList.globalActions && messageList.globalActions.length <= 3){
              contentMessage.interactive.body.text = receivedMessage.messagePayload.text
              contentMessage.interactive.type = "button"
              contentMessage.interactive.action.buttons = messageList.globalActions.map((content:any) => {
                return {
                  type: "reply",
                  reply: { id: content.label, title: content.label }
                };
              });
            }
            if(messageList.cards && messageList.cards.length <= 3){
              contentMessage.interactive.body.text = receivedMessage.messagePayload.text
              contentMessage.interactive.type = "button"
              contentMessage.interactive.action.buttons = messageList.cards.map((content:any) => {
                return {
                  type: "reply",
                  reply: { id: content.label, title: content.label }
                };
              });
            }
            // console.log(contentMessage)
            // return sendMessage(contentMessage)
          // }

          // if(listButton == "list-for-wpp-list" && isList){
  
       
           
            if(messageList.cards && messageList.cards.length > 3){
              contentMessage.interactive.type = "list"
              contentMessage.interactive.action.button =  "Selecione uma opção"
              interactive.action.sections = [{}]
              interactive.action.sections[0].title = ""
              contentMessage.interactive.body.text = !receivedMessage.messagePayload.text ? "Este campo permite que você escolha uma das opções disponíveis. Clique aqui para ver as alternativas e fazer sua seleção." : receivedMessage.messagePayload.text  
              interactive.action.sections[0].rows = messageList.cards.map((content: any) => {
                const titleParts = content.title.split(" - ");
                const titleToShow = titleParts.length > 1 ? titleParts[1] : titleParts[0];
                const shortenedTitle = titleToShow.length === 24 ? titleToShow.slice(0, -3) + "..." : titleToShow;
                return {
                  id: shortenedTitle,
                  title: shortenedTitle,
                  description: content.title
                };
              });
            }
            if(messageList.actions && messageList.actions.length > 3){
              contentMessage.interactive.type = "list"
              contentMessage.interactive.action.button =  "Selecione uma opção"
              interactive.action.sections = [{}]
              interactive.action.sections[0].title = ""
              contentMessage.interactive.body.text = !receivedMessage.messagePayload.text ? "Este campo permite que você escolha uma das opções disponíveis. Clique aqui para ver as alternativas e fazer sua seleção." : receivedMessage.messagePayload.text  
              interactive.action.sections[0].rows = messageList.actions.map((content: any) => {
                const titleParts = content.label.split(" - ");
                const titleToShow = titleParts.length > 1 ? titleParts[1] : titleParts[0];
                let shortenedTitle = titleToShow.length === 24 ? titleToShow.slice(0, -3) + "..." : titleToShow;
                if(shortenedTitle.length >= 24){
                  shortenedTitle = content.label.split(" ")[0]
                }
             
                return {
                  id: content.label,
                  title: shortenedTitle,
                  description: content.label
                };
              });
            }
            if(messageList.globalActions && messageList.globalActions.length > 3){
              contentMessage.interactive.type = "list"
              contentMessage.interactive.action.button =  "Selecione uma opção"
              interactive.action.sections = [{}]
              interactive.action.sections[0].title = ""
              contentMessage.interactive.body.text = !receivedMessage.messagePayload.text ? "Este campo permite que você escolha uma das opções disponíveis. Clique aqui para ver as alternativas e fazer sua seleção." : receivedMessage.messagePayload.text  
              interactive.action.sections[0].rows = messageList.globalActions.map((content: any) => {
                const titleParts = content.label.split(" - ");
                const titleToShow = titleParts.length > 1 ? titleParts[1] : titleParts[0];
                const shortenedTitle = titleToShow.length === 24 ? titleToShow.slice(0, -3) + "..." : titleToShow;
                return {
                  id: content.label,
                  title: shortenedTitle,
                  description: content.label
                };
              });
            }
            
            return sendMessage(contentMessage)
            
          // }
          // return false
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
          // console.log(JSON.stringify(contentMessage))
        }
    
        let valueForSending: any;

        if (receivedMessage.messagePayload.actions) {
          valueForSending = receivedMessage.messagePayload;
        } else if (receivedMessage.messagePayload.cards && receivedMessage.messagePayload.type === "card") {
          valueForSending = receivedMessage.messagePayload;
        } else if(receivedMessage.messagePayload.globalActions) {
          valueForSending = receivedMessage.messagePayload;        
        }else{
          valueForSending = []
        }
  
        // console.log()
        
        await buildPayloadWhatsapp(valueForSending, "list-for-wpp-list", true)
          .then(() => {
            console.log("Mensagem enviada com sucesso!!");
          })
          .catch((err) => {
            errorMessage();
            console.log(err);
          });

  
          if (!webhookExecutado) {
            await delay(5000);
            webhookExecutado = false;
          }
        
      }
    );

  webhook.receiver()(req, res, next);
}
