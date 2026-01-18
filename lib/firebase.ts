import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore, setLogLevel } from 'firebase/firestore';

const appId = process.env.NEXT_PUBLIC_APP_ID || 'kukuconnect-default';
const firebaseConfigStr = process.env.NEXT_PUBLIC_FIREBASE_CONFIG;
const firebaseConfig = firebaseConfigStr ? JSON.parse(firebaseConfigStr) : {};

// Set Firebase log level for debugging
// setLogLevel('debug'); // Uncomment if needed

// Initialize Firebase
const initializeFirebase = () => {
    if (Object.keys(firebaseConfig).length === 0) {
        console.warn("Firebase config not found. Running in offline/mock mode.");
        return { app: undefined, db: undefined, auth: undefined };
    }

    try {
        const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const auth = getAuth(app);
        return { app, db, auth };
    } catch (e) {
        console.error("Firebase init error:", e);
        return { app: undefined, db: undefined, auth: undefined };
    }
};

const { app, db, auth } = initializeFirebase();

export { app, db, auth, appId };
