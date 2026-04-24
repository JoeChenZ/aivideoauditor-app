import { createHmac } from 'crypto';

export interface KlingCredentials {
  accessKeyId: string;
  accessKeySecret: string;
}

export function parseApiKey(apiKey: string): KlingCredentials {
  const colonIndex = apiKey.indexOf(':');
  if (colonIndex === -1) {
    throw new Error('Kling API key must be in format accessKeyId:accessKeySecret');
  }
  return {
    accessKeyId: apiKey.slice(0, colonIndex),
    accessKeySecret: apiKey.slice(colonIndex + 1),
  };
}

export function generateKlingJWT(accessKeyId: string, accessKeySecret: string): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const now = Math.floor(Date.now() / 1000);
  const payload = Buffer.from(
    JSON.stringify({ iss: accessKeyId, exp: now + 1800, nbf: now - 5 })
  ).toString('base64url');
  const signature = createHmac('sha256', accessKeySecret)
    .update(`${header}.${payload}`)
    .digest('base64url');
  return `${header}.${payload}.${signature}`;
}
