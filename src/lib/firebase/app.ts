import {
	PUBLIC_API_KEY,
	PUBLIC_AUTH_DOMAIN,
	PUBLIC_PROJECT_ID,
	PUBLIC_STORAGE_BUCKET,
	PUBLIC_MESSAGING_SENDER_ID,
	PUBLIC_APP_ID,
	PUBLIC_MEASUREMENT_ID,
} from '$env/static/public';

import { initializeApp } from 'firebase/app';
// import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: PUBLIC_API_KEY,
	authDomain: PUBLIC_AUTH_DOMAIN,
	// databaseURL: PUBLIC_DATABASE_URL,
	projectId: PUBLIC_PROJECT_ID,
	storageBucket: PUBLIC_STORAGE_BUCKET,
	messagingSenderId: PUBLIC_MESSAGING_SENDER_ID,
	appId: PUBLIC_APP_ID,
	measurementId: PUBLIC_MEASUREMENT_ID,
};

/**
 * Initialized firebase instance
 */
export const app = initializeApp(firebaseConfig);

/**
 * Initialized firebase Real-Time Database instance
 */
// export const db = getDatabase(app);
