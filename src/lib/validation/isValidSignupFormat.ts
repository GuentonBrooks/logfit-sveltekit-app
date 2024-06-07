import isEmpty from 'validator/lib/isEmpty';
import isAscii from 'validator/lib/isAscii';
import isEmail from 'validator/lib/isEmail';

import { alertTextState, alertTypeState } from '$lib/store';
import type { SignupFormat } from '$lib/types/auth';

/**
 * Validate the login format and parameters
 *
 * @param signupFormat
 */
export default (signupFormat: SignupFormat) => {
	// Check if the email has a value
	if (isEmpty(signupFormat.email)) {
		alertTypeState.set('warning');
		alertTextState.set('Please enter an Email');
		return false;
	}

	// Check if the password has a value
	if (isEmpty(signupFormat.password)) {
		alertTypeState.set('warning');
		alertTextState.set('Please enter a password');
		return false;
	}

	// Check if the passwordConfirm has a value
	if (isEmpty(signupFormat.passwordConfirm)) {
		alertTypeState.set('warning');
		alertTextState.set('Please confirm your password');
		return false;
	}

	// Check if the email has forbidden characters
	if (!isAscii(signupFormat.email)) {
		alertTypeState.set('warning');
		alertTextState.set('Your Email contains forbidden characters');
		return false;
	}

	// Check if the email is an actual email
	if (!isEmail(signupFormat.email)) {
		alertTypeState.set('warning');
		alertTextState.set('Your Email does not appear to be a valid email address');
		return false;
	}

	// Check if the password has forbidden characters
	if (!isAscii(signupFormat.password)) {
		alertTypeState.set('warning');
		alertTextState.set('Your password contains forbidden characters');
		return false;
	}

	// Check if the passwords are matching
	if (signupFormat.password !== signupFormat.passwordConfirm) {
		alertTypeState.set('warning');
		alertTextState.set('Your passwords do not match');
		return false;
	}

	return true;
};
