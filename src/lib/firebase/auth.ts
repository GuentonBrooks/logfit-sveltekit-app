import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signInWithRedirect,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
} from 'firebase/auth';
import { app, db } from './app';
import { child, get, push, ref, remove, set } from 'firebase/database';

import { alertTextState, alertTypeState } from '$lib/store';
import { emailState, firstNameState, lastNameState, userIdState } from '$lib/store/auth';
import type { FirebaseDatabaseUserFormat, FirebaseUserShortInfoFormat } from '$lib/types/auth';

/** Initialize Auth Handler */
export const auth = getAuth(app);

/** Google Auth Provider */
const provider = new GoogleAuthProvider();

/** Sign in with Google redirect */
export const googleSignInRedirect = () =>
	signInWithRedirect(auth, provider).catch((error) => {
		alertTypeState.set('error');
		alertTextState.set(error.code);
		throw error;
	});

/** Sign in with Google popup */
export const googleSignInPopup = () =>
	signInWithPopup(auth, provider).catch((error) => {
		alertTypeState.set('error');
		alertTextState.set(error.code);
		throw error;
	});

/** Sign Out */
export const firebaseSignOut = () =>
	signOut(auth)
		.then(() => {
			userIdState.set('');
			emailState.set('');
			firstNameState.set('');
			lastNameState.set('');
		})
		.catch((error) => {
			alertTypeState.set('error');
			alertTextState.set(error.code);
			throw error;
		});

/** Sign up with Email and Password */
export const firebasePasswordSignUp = (email: string, password: string) =>
	createUserWithEmailAndPassword(auth, email, password).catch((error) => {
		alertTypeState.set('error');
		alertTextState.set(error.code);
		throw error;
	});

/** Sign in with Email and Password */
export const firebasePasswordSignIn = (email: string, password: string) =>
	signInWithEmailAndPassword(auth, email, password).catch((error) => {
		alertTypeState.set('error');
		alertTextState.set(error.code);
		throw error;
	});

/** Sign in with as Admin */
// export const firebaseAdminSignIn = (email: string, password: string) =>
// 	signInWithEmailAndPassword(auth, email, password)
// 		.then(() => fetchFirebaseUserInfo())
// 		.then((user) => {
// 			if (!user?.isAdmin) {
// 				throw new Error(errorInvalidAdmin);
// 			}
// 			return setFirebaseAdminState(user);
// 		})
// 		.catch((error) => {
// 			alertTypeState.set('error');
// 			alertTextState.set(error.code || error.message);
// 			throw error;
// 		});

/** Request Password Reset Email */
export const firebaseSendPasswordResetEmail = (email: string) =>
	sendPasswordResetEmail(auth, email)
		.then(() => {
			alertTypeState.set('success');
			alertTextState.set('Password Reset Email Successfully Sent');
		})
		.catch((error) => {
			alertTypeState.set('error');
			alertTextState.set(error.code);
			throw error;
		});

/** Get Current User's Uid */
export const getFirebaseUserId = () => auth.currentUser?.uid || '';

/** Get Current User's Email */
export const getFirebaseUserEmail = () => auth.currentUser?.email || '';

/** Get Current User's Display Name */
export const getFirebaseDisplayName = () => auth.currentUser?.displayName || '';

/** Get Current User's short Info */
export const getFirebaseUserShortInfo = (): FirebaseUserShortInfoFormat => {
	const shortInfo = {} as FirebaseUserShortInfoFormat;
	shortInfo.uid = getFirebaseUserId();
	shortInfo.email = getFirebaseUserEmail();

	if (!shortInfo.email) return shortInfo;

	const splitResult = shortInfo.email.split('@');
	shortInfo.firstName = splitResult[0].split('.')[0];
	shortInfo.lastName = splitResult[0].split('.')[1];
	return shortInfo;
};

/** Get Current User's long Info */
export const getFirebaseUserLongInfo = () => auth.currentUser;

/** Stores the current authenticated user in firebase Reat-Time DB */
export const storeFirebaseUserAsync = (user: FirebaseDatabaseUserFormat) =>
	set(ref(db, `users/${user.uid}`), user)
		.then(() => {
			alertTypeState.set('success');
			alertTextState.set('Auth/DB: ' + 'User Information Successfully Stored');
		})
		.catch((error) => {
			alertTypeState.set('error');
			alertTextState.set('Auth/DB: ' + error.message);
			throw error;
		});

/** Deletes the selected user from firebase Reat-Time DB */
export const removeFirebaseUserAsync = (uid: string) =>
	remove(ref(db, `users/${uid}`))
		.then(() => {
			alertTypeState.set('info');
			alertTextState.set('Auth/DB: ' + 'User Information Successfully Purged');
		})
		.catch((error) => {
			alertTypeState.set('error');
			alertTextState.set('Auth/DB: ' + error.message);
			throw error;
		});

/** Fetches the Current User's info from the DB */
export const fetchFirebaseUserInfo = () =>
	get(child(ref(db), `users/${getFirebaseUserId()}`))
		.then((snapshot) => {
			if (!snapshot.exists()) {
				return null;
			}
			return snapshot.val() as FirebaseDatabaseUserFormat;
		})
		.catch((error) => {
			alertTypeState.set('error');
			alertTextState.set('Auth/DB: ' + error.message);
			throw error;
		});

/** Stores the current authenticated user in state */
export const setFirebaseUserToState = (user: FirebaseDatabaseUserFormat) => {
	if (!user) {
		alertTypeState.set('error');
		alertTextState.set('AUTH: Failed to set User State');
		return;
	}

	userIdState.set(user.uid);
	emailState.set(user.email);
	firstNameState.set(user.firstName);
	lastNameState.set(user.lastName);
};

/** Stores the current authenticated user in state */
export const setFirebaseAdminState = (user: FirebaseDatabaseUserFormat) => {
	if (!user) return;
	userIdState.set(user.uid);
	emailState.set(user.email);
	firstNameState.set(user.firstName);
	lastNameState.set(user.lastName);
};

/** Get a Reference to the user db by the given uid */
export const getUserRef = (uid: string) => child(ref(db), `users/${uid}`);

/** Stores feedback in the firebase Reat-Time DB */
export const storeFirebaseFeedbackAsync = (uid: string, feedback: string) =>
	push(ref(db, `feedback/${uid}`), feedback)
		.then(() => {
			alertTypeState.set('success');
			alertTextState.set('FEEDBACK/DB: ' + 'Feedback Successfully Uploaded, Thank you!');
		})
		.catch((error) => {
			alertTypeState.set('error');
			alertTextState.set('FEEDBACK/DB: ' + error.message);
			throw error;
		});
