import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

import type { StorageProvider, UploadIntent } from './storage-provider.js';

const uploadRoot = join(process.cwd(), 'uploads');

export class LocalStorageProvider implements StorageProvider {
  async createUploadTarget(intent: UploadIntent) {
    await mkdir(uploadRoot, { recursive: true });

    return {
      provider: 'local' as const,
      key: intent.key,
      uploadUrl: `/api/v1/uploads/local/${encodeURIComponent(intent.key)}`,
      headers: {
        'content-type': intent.contentType,
        'x-max-bytes': String(intent.maxBytes),
      },
    };
  }
}
