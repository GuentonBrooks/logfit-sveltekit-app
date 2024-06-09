<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth, fetchFirebaseUserInfo, setFirebaseUserToState } from '$lib/firebase/auth';
	import { isDarkModeState } from '$lib/store';
	import { authUserPage, homePage } from '$utils/pages';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onDestroy, onMount } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';

	let unsubAuth: Unsubscriber;
	let unsubDarkMode: Unsubscriber;

	onMount(() => {
		unsubAuth = onAuthStateChanged(auth, (user) => {
			if (user) {
				fetchFirebaseUserInfo()
					.then((firebaseUser) => {
						if (!firebaseUser) return goto(authUserPage);

						setFirebaseUserToState(firebaseUser);
						goto(homePage);
					})
					.catch(() => console.log('error fetching firebase user'));
			}
		});
	});

	onMount(() => {
		unsubDarkMode = isDarkModeState.subscribe((isDarkMode) => {
			if (isDarkMode) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		});
	});

	onDestroy(() => {
		unsubAuth();
		unsubDarkMode();
	});
</script>

<slot />
