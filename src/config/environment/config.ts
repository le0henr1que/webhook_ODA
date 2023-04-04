import dotenv from "dotenv";

dotenv.config();

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const env = {
  whatsappToken: process.env.WHATSAPP_TOKEN,
  myTokenWhatsapp: process.env.MY_TOKEN,
  port: process.env.PORT,
  webHookClient: process.env.URL_WEBHOOK_CLIENT,
  secretWebhookClient: process.env.SECRET_WEBHOOK_CLIENT,
};

export default env;
