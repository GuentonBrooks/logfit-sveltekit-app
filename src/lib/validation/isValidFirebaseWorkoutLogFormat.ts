import isEmpty from 'validator/lib/isEmpty';
import isAscii from 'validator/lib/isAscii';

import { alertTextState, alertTypeState } from '$lib/store';
import type { FirebaseWorkoutLogFormat } from '$lib/types/log';

/**
 * Validate the FirebaseUser format and parameters
 *
 * @param logFormat
 */
export default (logFormat: FirebaseWorkoutLogFormat) => {
	// Validate Date
	if (!logFormat.date) {
		alertTypeState.set('warning');
		alertTextState.set('Log must have a date');
		return false;
	}
	if (isEmpty(logFormat.date)) {
		alertTypeState.set('warning');
		alertTextState.set('Log must have a date');
		return false;
	}
	if (!isAscii(logFormat.date)) {
		alertTypeState.set('warning');
		alertTextState.set('Your workout log contains forbidden characters');
		return false;
	}

	// Validate Duration
	if (!logFormat.duration) {
		alertTypeState.set('warning');
		alertTextState.set('Your workout log must have a duration');
		return false;
	}
	if (isNaN(logFormat.duration)) {
		alertTypeState.set('warning');
		alertTextState.set('Your workout log must have a duration');
		return false;
	}
	// if (!isAscii(logFormat.duration)) {
	// 	alertTypeState.set('warning');
	// 	alertTextState.set('Your workout duration contains forbidden characters');
	// 	return false;
	// }
	// if (!isNumeric(logFormat.duration)) {
	// 	alertTypeState.set('warning');
	// 	alertTextState.set(
	// 		'Your workout duration must be a numeric value representing time in minutes',
	// 	);
	// 	return false;
	// }

	// Validate Reps
	if (!logFormat.reps) {
		alertTypeState.set('warning');
		alertTextState.set('Your workout log must have an amount of completed reps (it can be 0)');
		return false;
	}
	if (isNaN(logFormat.reps)) {
		alertTypeState.set('warning');
		alertTextState.set('Your workout log must have an amount of completed reps (it can be 0)');
		return false;
	}
	// if (!isAscii(logFormat.reps)) {
	// 	alertTypeState.set('warning');
	// 	alertTextState.set('Your workout reps contains forbidden characters');
	// 	return false;
	// }
	// if (!isNumeric(logFormat.reps)) {
	// 	alertTypeState.set('warning');
	// 	alertTextState.set('Your workout reps must be a numeric value');
	// 	return false;
	// }

	return true;
};
