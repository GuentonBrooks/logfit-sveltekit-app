<script lang="ts">
	import type { Unsubscriber } from 'svelte/store';
	import { onDestroy, onMount } from 'svelte';
	import { isDarkModeState } from '$lib/store';
	import AppContainer from '$lib/components/containers/AppContainer.svelte';

	let unsubDarkMode: Unsubscriber;

	onMount(() => {
		unsubDarkMode = isDarkModeState.subscribe((isDarkMode) => {
			if (isDarkMode) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		});
	});

	onDestroy(() => unsubDarkMode());
</script>

<AppContainer>
	<slot />
</AppContainer>
