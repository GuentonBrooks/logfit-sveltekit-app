<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth, setFirebaseUserState } from '$lib/firebase/auth';
	import { authLoginPage, homePage } from '$utils/pages';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';

	onMount(() =>
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setFirebaseUserState();
				goto(homePage);
			} else {
				goto(authLoginPage);
			}
		}),
	);
</script>

<slot />
