
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.4a059fe03256495bbe7f3afc0d2757ad',
  appName: 'memo-math-android',
  webDir: 'dist',
  server: {
    url: 'https://4a059fe0-3256-495b-be7f-3afc0d2757ad.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    backgroundColor: '#6200EE'
  }
};

export default config;
