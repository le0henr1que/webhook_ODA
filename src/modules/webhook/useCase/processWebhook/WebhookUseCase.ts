
import api from "../../../../service/api"
import env from "../../../../config/environment/config"

export class WebhookUseCase {
  // constructor(private localRepositoryCreate: ICreateLocal) {}

  async execute(payload:any) {
    console.log(payload)
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.odaAccessToken}`
      }
    };
    const response = api.post('https://graph.facebook.com/v16.0//messages', payload, config)
    return response;
  }
}