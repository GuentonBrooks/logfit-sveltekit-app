<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';

	import RestartButton from '$lib/components/buttons/RestartButton.svelte';
	import LoginContainer from '$lib/components/containers/LoginContainer.svelte';
	import LoginFormContainer from '$lib/components/containers/LoginFormContainer.svelte';
	import { alertTextState, alertTypeState } from '$lib/store';

	let errorMessage = $page.error?.message ?? '';

	$: errorMessage && alertTextState.set(errorMessage);
	$: errorMessage && alertTypeState.set('error');
</script>

<LoginContainer>
	<LoginFormContainer label="Oh Snap... an Error has occured">
		<RestartButton on:click={invalidateAll} />
	</LoginFormContainer>
</LoginContainer>
