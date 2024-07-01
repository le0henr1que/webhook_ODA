import axios from "axios";

export async function sendLogToLogflare(message: any) {
  const logflareApiEndpoint = "https://api.logflare.app/logs";
  const logflareSourceKey = "4a65d5b8-a49f-4974-bd4e-faa17ac47bc6";
  const logflareApiKey = "YC9m0CHh7-mB";

  const logData = {
    source: logflareSourceKey,
    log_entry: message,
  };

  try {
    await axios.post(logflareApiEndpoint, logData, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": logflareApiKey,
      },
    });
    console.log("Log enviado ao Logflare com sucesso.");
  } catch (error) {
    console.error("Erro ao enviar log ao Logflare:", error);
  }
}
