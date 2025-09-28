interface WebhookPayload {
  [key: string]: any;
}

const store = new Map<string, WebhookPayload>();

export const webhookStore = {
  set: (key: string, value: WebhookPayload) => {
    console.log(`[WebhookStore] Setting data for key: ${key}`);
    store.set(key, value);
  },
  get: (key: string) => {
    console.log(`[WebhookStore] Getting data for key: ${key}`);
    return store.get(key);
  },
  delete: (key: string) => {
    console.log(`[WebhookStore] Deleting data for key: ${key}`);
    return store.delete(key);
  },
};
