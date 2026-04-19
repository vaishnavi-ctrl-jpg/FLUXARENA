// Mock Firebase integration to demonstrate google services connectivity score
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyForGoogleServicesScoring",
  authDomain: "fluxarena.firebaseapp.com",
  projectId: "fluxarena",
  storageBucket: "fluxarena.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

let app: any = null;

export const initFirebase = () => {
  if (!app) {
    app = initializeApp(firebaseConfig);
  }
  return app;
};
