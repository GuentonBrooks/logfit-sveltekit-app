import { db } from './app';
import { child, push, ref, remove, update } from 'firebase/database';

import { alertTextState, alertTypeState } from '$lib/store';
import type { FirebaseWorkoutLogFormat } from '$lib/types/log';

export const getAllWorkoutLogRef = () => child(ref(db), 'logs/');
export const getAllUserWorkoutLogRef = () => child(ref(db), 'user-logs/');
export const getWorkoutLogRef = (key: string) => child(ref(db), `logs/${key}`);
export const getUserLogRef = (uid: string) => child(ref(db), `user-logs/${uid}`);

/** Stores the current authenticated user in firebase Reat-Time DB */
export const storeNewFirebaseWorkoutLogAsync = (log: FirebaseWorkoutLogFormat) => {
	const newLogKey = push(child(ref(db), 'logs')).key;

	if (!newLogKey) {
		alertTypeState.set('error');
		alertTextState.set('Logs/DB: ' + 'Failed to create new workout Log');
		throw new Error('Failed to create new workout Log');
	}

	const updates: { [key: string]: FirebaseWorkoutLogFormat } = {};
	updates[`logs/${newLogKey}`] = log;
	updates[`user-logs/${log.uid}/${newLogKey}`] = log;

	return update(ref(db), updates)
		.then(() => {
			alertTypeState.set('success');
			alertTextState.set('Logs/DB: ' + 'Workout Log Successfully Stored');
		})
		.catch((error) => {
			alertTypeState.set('error');
			alertTextState.set('Logs/DB: ' + error.message);
			throw error;
		});
};

export const updateFirebaseWorkoutLogAsync = (key: string, log: FirebaseWorkoutLogFormat) => {
	if (!key) {
		alertTypeState.set('error');
		alertTextState.set('Logs/DB: ' + 'Failed to create new workout Log could not find the log key');
		throw new Error('Failed to create new workout Log could not find the log key');
	}

	const updates: { [key: string]: FirebaseWorkoutLogFormat } = {};
	updates[`logs/${key}`] = log;
	updates[`user-logs/${log.uid}/${key}`] = log;

	return update(ref(db), updates)
		.then(() => {
			alertTypeState.set('success');
			alertTextState.set('Logs/DB: ' + 'Workout Log Successfully Updated');
		})
		.catch((error) => {
			alertTypeState.set('error');
			alertTextState.set('Logs/DB: ' + error.message);
			throw error;
		});
};

/** Deletes the selected log from firebase Reat-Time DB */
export const removeFirebaseWorkoutLogAsync = (key: string, uid: string) => {
	if (!key) {
		alertTypeState.set('error');
		alertTextState.set('Logs/DB: ' + 'Failed to delete the workout Log, missing log Key');
		throw new Error('Failed to delete the workout Log, missing log Key');
	}
	if (!uid) {
		alertTypeState.set('error');
		alertTextState.set('Logs/DB: ' + 'Failed to delete the workout Log, missing User Id');
		throw new Error('Failed to delete the workout Log, missing User Id');
	}

	return remove(ref(db, `logs/${key}`))
		.then(() => remove(ref(db, `user-logs/${uid}/${key}`)))
		.then(() => {
			alertTypeState.set('info');
			alertTextState.set('Auth/DB: ' + 'Workout Log Successfully Purged');
		})
		.catch((error) => {
			alertTypeState.set('error');
			alertTextState.set('Auth/DB: ' + error.message);
			throw error;
		});
};
