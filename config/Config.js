// ODA Details
exports.ODA_WEBHOOK_URL =
  "https://oda-cfc6b03f098a48c7b7365a21e619b4fa-da10.data.digitalassistant.oci.oraclecloud.com/connectors/v2/listeners/webhook/channels/42fe2ae4-5b75-421f-bc39-b5ec8c2cfd35";
exports.ODA_WEBHOOK_SECRET = "svMjNN9DoW0bc1kAuiBvJfx2nBJeiBhy";

// WhatsApp Details
exports.API_URL = "https://graph.facebook.com";
exports.ENDPOINT_API = "messages";
exports.VERIFY_TOKEN = process.env.VERIFY_TOKEN || "access-token";
exports.ACCESS_TOKEN =
  process.env.ACCESS_TOKEN ||
  "EAADaO3ZCOVKoBO5xLGme3Qkey8kyecWYqOaWTjynDTk4mcYhcOL9uxGWg1VCZB9gxhYqtSTR08alOd3RREBq16PWJMcTsHOlHCCpV7NAA9rqqZCetjAoRsyqMBbZA9t7ZBLc3CsFK38fpAKZAVlwdVUQCZB97odWfxXsj9mjtw2WFQcICeqaPJ6kDC6rvaaXZAv2LnRdE7sPttGhxJDleAq1WUqQEbHV";
exports.API_VERSION = process.env.VERSION || "v17.0";
exports.PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID || "114541121694377";
exports.LIST_TITLE_DEFAULT_LABEL = "Selecionar um(a)";

// General Detail
exports.port = process.env.port || 3000;
exports.FILES_URL = "https://webhookoda-production.up.railway.app"; //your app server url
exports.LOG_LEVEL = "info";

// WhatsApp Sender event IDs
exports.EVENT_QUEUE_MESSAGE_TO_WHATSAPP = "100";
exports.EVENT_WHATSAPP_MESSAGE_DELIVERED = "1000";
exports.EVENT_PROCESS_NEXT_WHATSAPP_MESSAGE = "2000";
