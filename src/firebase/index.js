import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,   // Firebase projesinin API anahtarı
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,    // Auth işlemleri için domain (örn: projeadi.firebaseapp.com)
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,      // Firebase proje ID'si
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET, // Dosya depolama için bucket adresi
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID, // Firebase Cloud Messaging için ID
  appId: import.meta.env.VITE_FIREBASE_APP_ID     // Firebase uygulama ID'si
};

// Firebase uygulamasını başlat
const app = initializeApp(firebaseConfig);

// Auth ve Firestore servislerini export et
export const auth = getAuth(app);
export const db = getFirestore(app);

// Kullanıcı rolleri için sabit değerler
export const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user'
}