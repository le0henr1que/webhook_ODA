# Seikyo Webhook documentation

# **Integração do Oracle Digital Assistant com o WhatsApp via Facebook for Developers**

**Pré-requisitos:**

- Conta no Oracle Digital Assistant
- Conta no Facebook for Developers
- Número de telefone válido para registrar no WhatsApp Business API

## **Configuração no Facebook for Developers**

1. Acesse o site do **[Facebook for Developers](https://developers.facebook.com/)** e faça login com sua conta.
2. Crie um novo aplicativo seguindo as instruções fornecidas pelo Facebook for Developers.
3. No painel do aplicativo, acesse a seção "Configurações" e, em seguida, "Básico".
4. Anote o "ID do Aplicativo" e a "Chave Secreta do Aplicativo", pois você precisará dessas informações posteriormente.

## **Configuração do WhatsApp Business API**

1. Configure o WhatsApp Business API seguindo as instruções oficiais do **[WhatsApp](https://www.whatsapp.com/business/api)**.
2. Obtenha as credenciais necessárias, como o "Token do WhatsApp Business API" e as informações sobre o servidor e o número do telefone.

## **Configuração do Oracle Digital Assistant**

1. Acesse o **[Oracle Digital Assistant Console](https://www.oracle.com/digital-assistant)** e faça login em sua conta.
2. Crie um novo agente ou selecione um agente existente para a integração com o WhatsApp.
3. No Console do agente, acesse a seção "Canais" e clique em "Configurar" para o canal WhatsApp.
4. Preencha as informações necessárias, incluindo o número de telefone registrado anteriormente e as credenciais do WhatsApp Business API.
5. Salve as configurações e anote o "Endpoint URL" fornecido pelo Oracle Digital Assistant, pois você precisará dessa informação para configurar o webhook.

## **Configuração do Webhook**

Agora vamos configurar o webhook para que o ODA e o WhatsApp possam se comunicar.

1. Defina um servidor ou endpoint para receber as solicitações do webhook. Isso pode ser feito em uma aplicação Node.js, por exemplo.
2. `GET` para a URL "/webhook" que será usada para a verificação de assinatura do WhatsApp Business API.
3. `POST`"/webhook", lógica de comunicação e obtenção do Whatsapp com o ODA, para processar as mensagens recebidas do WhatsApp Business API. No endpoint POST "/webhook", você precisará implementar a lógica para receber as mensagens do WhatsApp Business API, processá-las e encaminhá-las ao Oracle Digital Assistant.
4. `POST` /bot/message, rota que processa as mensagem do digital assistent e retorna a resposta processada para o whatsapp.

## **Configuração do Facebook for Developers Webhook**

1. No Console do Facebook for Developers, acesse a seção "Webhooks" no painel do seu aplicativo.
2. Clique em "Configurar Webhooks".
3. No campo "URL do webhook", insira a URL do seu servidor com a rota "/webhook".
4. Selecione o tipo de assinatura "messages" para receber eventos de mensagens do WhatsApp Business API.
5. Insira a "Chave Secreta do Aplicativo" que você anotou anteriormente.
6. Clique em "Verificar e Salvar" para confirmar a configuração.

## **Teste e Verificação**

1. Inicie o servidor que você configurou para o webhook.
2. Verifique se todas as rotas e endpoints estão funcionando corretamente.
3. No Console do Oracle Digital Assistant, acesse a seção "Testar" e inicie uma conversa com o agente configurado para o WhatsApp.
4. Envie mensagens para o número de telefone registrado no WhatsApp Business API e verifique se as mensagens são processadas corretamente pelo ODA e as respostas são enviadas de volta ao WhatsApp.

Parabéns! Agora você concluiu a integração do Oracle Digital Assistant com o WhatsApp via Facebook for Developers. O seu assistente virtual está pronto para interagir com os usuários por meio do WhatsApp, proporcionando uma experiência conversacional automatizada. Lembre-se de monitorar e atualizar regularmente a integração para garantir um bom desempenho contínuo.

---

# Postman Documentation

[](https://grey-crescent-926935.postman.co/workspace/Team-Workspace~7b8abb1c-86bf-4393-8498-a8e87d5127da/collection/23356385-f5464059-92d3-4f28-898f-883e4f557eb2?action=share&creator=23356385)

Em caso de dúvidas ou problemas, consulte a documentação oficial do Oracle Digital Assistant e do WhatsApp Business API.