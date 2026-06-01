import * as SecureStore from 'expo-secure-store';

export type SecureStorageKey = 'accessToken' | 'refreshToken';

export async function getSecureItem(key: SecureStorageKey) {
  return SecureStore.getItemAsync(key);
}

export async function setSecureItem(key: SecureStorageKey, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function deleteSecureItem(key: SecureStorageKey) {
  await SecureStore.deleteItemAsync(key);
}
