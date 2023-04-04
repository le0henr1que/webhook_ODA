interface channel {
  url: string;
  secret: string;
}

export interface WebhookConfig {
  receiver?(): any;
  send?: any;
  MessageModel?: any;
  channel?: channel;
  on?: any;
}

export interface callbackFromApiSide {
  mode: string;
  challange: string;
  token: string;
}

declare global {
  namespace Express {
    interface Request {
      webhook?: WebhookConfig;
    }
  }
}
