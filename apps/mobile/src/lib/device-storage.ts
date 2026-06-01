import { createMMKV } from 'react-native-mmkv';

export const deviceStorage = createMMKV({
  id: 'evivi-device-storage',
});

export function getStringPreference(key: string) {
  return deviceStorage.getString(key);
}

export function setStringPreference(key: string, value: string) {
  deviceStorage.set(key, value);
}

export function deletePreference(key: string) {
  deviceStorage.remove(key);
}
