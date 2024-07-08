// ODA Details
exports.ODA_WEBHOOK_URL = process.env.URL_WEBHOOK_CLIENT;
exports.ODA_WEBHOOK_SECRET = process.env.SECRET_WEBHOOK_CLIENT;

// WhatsApp Details
exports.API_URL = "https://graph.facebook.com";
exports.ENDPOINT_API = "messages";
exports.VERIFY_TOKEN = process.env.MY_TOKEN;
exports.ACCESS_TOKEN = process.env.WHATSAPP_TOKEN;
exports.API_VERSION = "v17.0";
exports.PHONE_NUMBER_ID = "114541121694377";
exports.LIST_TITLE_DEFAULT_LABEL = "Selecionar um(a)";

// General Detail
exports.port = 3000;
exports.FILES_URL = "https://webhookoda-production.up.railway.app"; //your app server url
exports.LOG_LEVEL = "info";

// WhatsApp Sender event IDs
exports.EVENT_QUEUE_MESSAGE_TO_WHATSAPP = "100";
exports.EVENT_WHATSAPP_MESSAGE_DELIVERED = "1000";
exports.EVENT_PROCESS_NEXT_WHATSAPP_MESSAGE = "2000";
