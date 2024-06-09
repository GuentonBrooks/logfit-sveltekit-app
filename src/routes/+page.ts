import { getFirebaseUserId } from '$lib/firebase/auth';
import { authLoginPage, homePage } from '$utils/pages';
import { redirect } from '@sveltejs/kit';

export const ssr = false;

export const load = () => {
	const userId = getFirebaseUserId();

	if (userId) {
		throw redirect(307, homePage);
	} else {
		throw redirect(307, authLoginPage);
	}
};
