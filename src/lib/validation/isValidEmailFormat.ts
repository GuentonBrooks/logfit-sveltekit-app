import isEmpty from 'validator/lib/isEmpty';
import isAscii from 'validator/lib/isAscii';
import isEmail from 'validator/lib/isEmail';

import { alertTextState, alertTypeState } from '$lib/store';

/**
 * Validate the login format and parameters
 *
 * @param email
 */
export default (email: string) => {
	// Check if the email has a value
	if (isEmpty(email)) {
		alertTypeState.set('warning');
		alertTextState.set('Please enter an Email');
		return false;
	}

	// Check if the email has forbidden characters
	if (!isAscii(email)) {
		alertTypeState.set('warning');
		alertTextState.set('Your Email contains forbidden characters');
		return false;
	}

	// Check if the email is an actual email
	if (!isEmail(email)) {
		alertTypeState.set('warning');
		alertTextState.set('Your Email does not appear to be a valid email address');
		return false;
	}

	return true;
};
