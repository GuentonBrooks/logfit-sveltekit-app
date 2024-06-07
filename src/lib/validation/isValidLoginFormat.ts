import isEmpty from 'validator/lib/isEmpty';
import isAscii from 'validator/lib/isAscii';
import isEmail from 'validator/lib/isEmail';

import { alertTextState, alertTypeState } from '$lib/store';
import type { LoginFormat } from '$lib/types/auth';

/**
 * Validate the login format and parameters
 *
 * @param loginFormat
 */
export default (loginFormat: LoginFormat) => {
	// Check if the email has a value
	if (isEmpty(loginFormat.email)) {
		alertTypeState.set('warning');
		alertTextState.set('Please enter an Email');
		return false;
	}

	// Check if the password has a value
	if (isEmpty(loginFormat.password)) {
		alertTypeState.set('warning');
		alertTextState.set('Please enter a password');
		return false;
	}

	// Check if the email has forbidden characters
	if (!isAscii(loginFormat.email)) {
		alertTypeState.set('warning');
		alertTextState.set('Your Email contains forbidden characters');
		return false;
	}

	// Check if the email is an actual email
	if (!isEmail(loginFormat.email)) {
		alertTypeState.set('warning');
		alertTextState.set('Your Email does not appear to be a valid email address');
		return false;
	}

	// Check if the password has forbidden characters
	if (!isAscii(loginFormat.password)) {
		alertTypeState.set('warning');
		alertTextState.set('Your password contains forbidden characters');
		return false;
	}

	return true;
};
