import { app } from './app';
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
// import { child, get, ref, set } from 'firebase/database';

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
	createUserWithEmailAndPassword(auth, email, password)
		// .then(() => storeFirebaseUserAsync())
		.then(() => setFirebaseUserState())
		.catch((error) => {
			alertTypeState.set('error');
			alertTextState.set(error.code);
			throw error;
		});

/** Sign in with Email and Password */
export const firebasePasswordSignIn = (email: string, password: string) =>
	signInWithEmailAndPassword(auth, email, password)
		.then(() => setFirebaseUserState())
		.catch((error) => {
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
// export const storeFirebaseUserAsync = () =>
// 	set(ref(db, `users/${getFirebaseUserId()}`), { ...getFirebaseUserShortInfo(), isAdmin: false });

/** Fetches the Current User's info from the DB */
// export const fetchFirebaseUserInfo = () =>
// 	get(child(ref(db), `users/${getFirebaseUserId()}`))
// 		.then((snapshot) => {
// 			if (!snapshot.exists()) {
// 				return null;
// 			}
// 			return snapshot.val() as FirebaseDatabaseUserFormat;
// 		})
// 		.catch((error) => {
// 			throw error;
// 		});

/** Stores the current authenticated user in state */
export const setFirebaseUserState = () => {
	const user = getFirebaseUserLongInfo();

	if (!user) return;
	userIdState.set(user.uid);

	if (!user.email) return;
	emailState.set(user.email);

	const splitResult = user.email.split('@');
	const firstName = splitResult[0].split('.')[0];
	const lastName = splitResult[0].split('.')[1];
	firstNameState.set(firstName);
	lastNameState.set(lastName);
};

/** Stores the current authenticated user in state */
export const setFirebaseAdminState = (user: FirebaseDatabaseUserFormat) => {
	if (!user) return;
	userIdState.set(user.uid);
	emailState.set(user.email);
	firstNameState.set(user.firstName);
	lastNameState.set(user.lastName);
};
