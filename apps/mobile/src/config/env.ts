import Constants from 'expo-constants';

const localhostApiUrl = 'http://localhost:4000';

export const env = {
  apiUrl:
    process.env.EXPO_PUBLIC_API_URL ??
    (Constants.expoConfig?.extra?.apiUrl as string | undefined) ??
    localhostApiUrl,
};
