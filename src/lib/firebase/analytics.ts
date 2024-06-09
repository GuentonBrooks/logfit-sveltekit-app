import { analyticsState } from '$lib/store/analytics';
import type { GoogleAnalyticsEvent } from '$lib/types/analytics';

/** Handles the Google signIn analytics event. */
export const analyticGoogleSignIn = () => {
	const newEvent: GoogleAnalyticsEvent = {
		id: 'sign-in-request',
		data: {
			method: 'google',
		},
		event: 'login',
		type: 'event',
	};

	analyticsState.update((events) => [...events, newEvent]);
};

/** Handles the Email and Password signIn analytics event. */
export const analyticEmailAndPasswordSignIn = () => {
	const newEvent: GoogleAnalyticsEvent = {
		id: 'sign-in-request',
		data: {
			method: 'email_and_password',
		},
		event: 'login',
		type: 'event',
	};

	analyticsState.update((events) => [...events, newEvent]);
};

/** Handles the sign-up request analytics event. */
export const analyticSignUpRequest = (email: string) => {
	const newEvent: GoogleAnalyticsEvent = {
		id: 'signup-request',
		data: {
			method: 'email_and_password',
			email: email,
		},
		event: 'sign_up',
		type: 'event',
	};

	analyticsState.update((events) => [...events, newEvent]);
};

/** Handles the password reset request analytics event. */
export const analyticResetRequest = (email: string) => {
	const newEvent: GoogleAnalyticsEvent = {
		id: 'reset-request',
		data: {
			method: 'email_and_password',
			email: email,
		},
		event: 'password_reset',
		type: 'event',
	};

	analyticsState.update((events) => [...events, newEvent]);
};

export const analyticsUpdateUserEvent = (uid: string) => {
	const newEvent: GoogleAnalyticsEvent = {
		id: 'profile-update',
		data: { uid },
		event: 'profile_update',
		type: 'event',
	};

	analyticsState.update((events) => [...events, newEvent]);
};
