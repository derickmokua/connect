"use client";

import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Singleton pattern with guaranteed non-null returns
let cachedApp: FirebaseApp | null = null;
let cachedAuth: Auth | null = null;
let cachedDb: Firestore | null = null;

function getOrInitializeApp(): FirebaseApp {
  if (cachedApp) return cachedApp;
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  cachedApp = app;
  return app;
}

function getOrInitializeAuth(): Auth {
  if (cachedAuth) return cachedAuth;
  const authInstance = getAuth(getOrInitializeApp());
  if (!authInstance) {
    throw new Error("Failed to initialize Firebase Auth");
  }
  cachedAuth = authInstance;
  return authInstance;
}

function getOrInitializeDb(): Firestore {
  if (cachedDb) return cachedDb;
  const dbInstance = getFirestore(getOrInitializeApp());
  if (!dbInstance) {
    throw new Error("Failed to initialize Firebase Firestore");
  }
  cachedDb = dbInstance;
  return dbInstance;
}

export const auth: Auth = getOrInitializeAuth();
export const db: Firestore = getOrInitializeDb();
export const appId = firebaseConfig.appId;

export const app: FirebaseApp = getOrInitializeApp();
