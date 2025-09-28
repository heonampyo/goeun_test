import axios, { AxiosError } from 'axios';
import { URLSearchParams } from 'url';

// --- 환경 변수 ---
const EFS_API_BASE = process.env.EFS_API_BASE || 'https://kr-api.eformsign.com';
const EFS_API_KEY = process.env.EFS_API_KEY;
const EFS_SECRET_KEY = process.env.EFS_SECRET_KEY;
const EFS_ADMIN_ID = process.env.EFS_ADMIN_ID;
const REQ_TIMEOUT = parseInt(process.env.REQ_TIMEOUT || '30000', 10);

const API_PREFIX = `${EFS_API_BASE}/v2.0/api`;

// --- 로깅 유틸 ---
const log = (title: string, data: object) => {
  try {
    console.log(`[EFS] ${JSON.stringify({ _: title, ...data })}`);
  } catch (e) {
    console.log(`[EFS] ${title}`, data);
  }
};

// --- 커스텀 에러 ---
export class HttpRelayError extends Error {
  status: number;
  body: unknown;

  constructor(status: number, body: unknown, message?: string) {
    super(message || `HTTP Error: ${status}`);
    this.name = 'HttpRelayError';
    this.status = status;
    this.body = body;
  }
}

// --- eformsign 클라이언트 클래스 ---
class EformsignClient {
  private _cachedToken: string | null = null;
  private _cachedTokenExpireMs: number = 0;

  constructor() {
    if (!EFS_API_KEY) throw new Error('EFS_API_KEY is not set');
    if (!EFS_SECRET_KEY) throw new Error('EFS_SECRET_KEY is not set');
    if (!EFS_ADMIN_ID) throw new Error('EFS_ADMIN_ID is not set');
  }

  // --- Access Token 발급 ---
  async getAccessToken(): Promise<string> {
    const nowMs = Date.now();
    if (this._cachedToken && nowMs < this._cachedTokenExpireMs) {
      return this._cachedToken;
    }

    const exeTime = String(nowMs);
    const base64Key = Buffer.from(EFS_API_KEY!).toString('base64');
    const headers = {
      'accept': 'application/json',
      'eformsign_signature': `Bearer ${EFS_SECRET_KEY}`,
      'Authorization': `Bearer ${base64Key}`,
      'Content-Type': 'application/json',
    };
    const url = `${EFS_API_BASE}/v2.0/api_auth/access_token`;
    const payload = { execution_time: exeTime, member_id: EFS_ADMIN_ID };

    log('access_token:request', { url, headers: { ...headers, Authorization: '***' }, payload });

    try {
      const response = await axios.post(url, payload, { headers, timeout: REQ_TIMEOUT });
      log('access_token:response', { status: response.status, data: response.data });

      const token = response.data?.oauth_token?.access_token || response.data?.access_token;
      if (!token) {
        throw new Error('No access_token in response');
      }

      this._cachedToken = token;
      this._cachedTokenExpireMs = nowMs + 9 * 60 * 1000; // 9분 캐시
      return token;
    } catch (error) {
      const err = error as AxiosError;
      log('access_token:error', { status: err.response?.status, data: err.response?.data });
      throw new HttpRelayError(err.response?.status || 500, err.response?.data, 'Token request failed');
    }
  }

  // --- 문서 생성 (외부 전송) ---
  async createDocumentExternal(templateId: string, documentBody: Record<string, unknown>): Promise<Record<string, unknown>> {
    const token = await this.getAccessToken();
    const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
    const url = `${API_PREFIX}/documents?template_id=${templateId}`;
    const payload = { document: documentBody };

    log('create_document:request', { url, headers: { ...headers, Authorization: '***' }, payload });

    try {
      const response = await axios.post(url, payload, { headers, timeout: REQ_TIMEOUT });
      log('create_document:response', { status: response.status, data: response.data });
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      log('create_document:error', { status: err.response?.status, data: err.response?.data });
      throw new HttpRelayError(err.response?.status || 500, err.response?.data, 'Create document failed');
    }
  }
  
  // --- 문서 상세 조회 ---
  async getDocumentDetail(documentId: string, includeFields: boolean = true): Promise<Record<string, unknown>> {
    const token = await this.getAccessToken();
    const headers = { 'Authorization': `Bearer ${token}` };
    const params = new URLSearchParams({ include_fields: String(includeFields) });
    const url = `${API_PREFIX}/documents/${documentId}?${params}`;

    log('get_document:request', { url, headers: { ...headers, Authorization: '***' } });

    try {
        const response = await axios.get(url, { headers, timeout: REQ_TIMEOUT });
        log('get_document:response', { status: response.status, data: response.data });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        log('get_document:error', { status: err.response?.status, data: err.response?.data });
        throw new HttpRelayError(err.response?.status || 500, err.response?.data, 'Get document detail failed');
    }
  }

  // --- 파일 다운로드 ---
  async downloadFiles(documentId: string, fileType: string = 'document'): Promise<{ content: Buffer, filename: string }> {
    const token = await this.getAccessToken();
    const headers = { 'Authorization': `Bearer ${token}` };
    const params = new URLSearchParams({ file_type: fileType });
    const url = `${API_PREFIX}/documents/${documentId}/download_files?${params}`;

    log('download_files:request', { url, params: { file_type: fileType } });

    try {
        const response = await axios.get(url, { headers, timeout: REQ_TIMEOUT, responseType: 'arraybuffer' });
        log('download_files:response', { status: response.status, contentLength: response.headers['content-length'] });

        let filename = 'download.zip';
        const cd = response.headers['content-disposition'];
        if (cd && cd.includes('filename=')) {
            const match = cd.match(/filename="?([^"]+)"?/);
            if (match) filename = match[1];
        }
        
        return { content: Buffer.from(response.data), filename };
    } catch (error) {
        const err = error as AxiosError;
        log('download_files:error', { status: err.response?.status, data: err.response?.data });
        throw new HttpRelayError(err.response?.status || 500, err.response?.data, 'Download files failed');
    }
  }

  // --- 문서 목록 조회 ---
  async listDocumentsAuto(body: Record<string, unknown>): Promise<Record<string, unknown>> {
    const token = await this.getAccessToken();
    const url = `${API_PREFIX}/list_document`;
    const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
    
    const payload: Record<string, any> = {
        type: body.type || "03",
        limit: body.limit || 20,
        skip: body.skip || 0,
    };

    [
        "title", "title_and_content", "content",
        "template_id", "template_ids",
        "include_fields", "include_histories",
        "include_previous_status", "include_next_status",
        "start_complete_date", "end_complete_date",
    ].forEach(key => {
        if (body[key] !== undefined && body[key] !== null && body[key] !== "") {
            payload[key] = body[key];
        }
    });

    log('list_documents:request(POST)', { url, body: payload });

    try {
        const response = await axios.post(url, payload, { headers, timeout: REQ_TIMEOUT });
        log('list_documents:response(POST)', { status: response.status, data: response.data });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        log('list_documents:error', { status: err.response?.status, data: err.response?.data });
        throw new HttpRelayError(err.response?.status || 500, err.response?.data, 'List documents failed');
    }
  }
}

export const efsClient = new EformsignClient();
