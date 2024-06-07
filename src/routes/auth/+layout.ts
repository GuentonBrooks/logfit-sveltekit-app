import { getFirebaseUserId, setFirebaseUserState } from '$lib/firebase/auth';
import { homePage } from '$utils/pages';
import { redirect } from '@sveltejs/kit';

export const ssr = false;

export const load = () => {
	const userId = getFirebaseUserId();

	if (userId) {
		setFirebaseUserState();
		throw redirect(307, homePage);
	}

	return {};
};