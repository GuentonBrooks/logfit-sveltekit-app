import { getFirebaseUserId, setFirebaseUserState } from '$lib/firebase/auth';
import { authLoginPage } from '$utils/pages';
import { redirect } from '@sveltejs/kit';

export const ssr = false;

export const load = () => {
	const userId = getFirebaseUserId();

	if (userId) {
		setFirebaseUserState();
	} else {
		throw redirect(307, authLoginPage);
	}

	return {};
};
