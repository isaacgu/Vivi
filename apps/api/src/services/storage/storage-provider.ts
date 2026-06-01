export type UploadIntent = {
  key: string;
  contentType: string;
  maxBytes: number;
};

export type UploadTarget = {
  provider: 'local' | 's3';
  key: string;
  uploadUrl: string;
  headers: Record<string, string>;
};

export interface StorageProvider {
  createUploadTarget(intent: UploadIntent): Promise<UploadTarget>;
}
