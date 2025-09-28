import fs from 'fs/promises';
import path from 'path';

const storePath = path.join(process.cwd(), 'tmp', 'webhook-store.json');

async function readStore() {
  try {
    await fs.mkdir(path.dirname(storePath), { recursive: true });
    const data = await fs.readFile(storePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // 파일이 없거나 비어있으면 초기 상태 반환
    return {};
  }
}

async function writeStore(data: any) {
  await fs.mkdir(path.dirname(storePath), { recursive: true });
  await fs.writeFile(storePath, JSON.stringify(data, null, 2));
}

export const webhookFileStore = {
  async set(key: string, value: any) {
    const store = await readStore();
    store[key] = value;
    await writeStore(store);
  },
  async get(key: string) {
    const store = await readStore();
    return store[key];
  },
  async delete(key: string) {
    const store = await readStore();
    delete store[key];
    await writeStore(store);
  },
};
