import isEmpty from 'validator/lib/isEmpty';
import isAscii from 'validator/lib/isAscii';

import { alertTextState, alertTypeState } from '$lib/store';
import type { FirebaseDatabaseUserFormat } from '$lib/types/auth';

/**
 * Validate the FirebaseUser format and parameters
 *
 * @param userFormat
 */
export default (userFormat: FirebaseDatabaseUserFormat) => {
	// Validate First Name
	if (isEmpty(userFormat.firstName)) {
		alertTypeState.set('warning');
		alertTextState.set('Please enter a first name');
		return false;
	}
	if (!isAscii(userFormat.firstName)) {
		alertTypeState.set('warning');
		alertTextState.set('Your first name contains forbidden characters');
		return false;
	}

	// Validate Last Name
	if (isEmpty(userFormat.lastName)) {
		alertTypeState.set('warning');
		alertTextState.set('Please enter a last name');
		return false;
	}
	if (!isAscii(userFormat.lastName)) {
		alertTypeState.set('warning');
		alertTextState.set('Your last name contains forbidden characters');
		return false;
	}

	return true;
};
