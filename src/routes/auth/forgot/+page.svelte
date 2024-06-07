<script lang="ts">
	import { goto } from '$app/navigation';
	import ResetButton from '$lib/components/buttons/ResetButton.svelte';
	import EmailInput from '$lib/components/inputs/EmailInput.svelte';
	import LoginContainer from '$lib/components/containers/LoginContainer.svelte';
	import LoginFormContainer from '$lib/components/containers/LoginFormContainer.svelte';
	import { analyticResetRequest } from '$lib/firebase/analytics';
	import { firebaseSendPasswordResetEmail } from '$lib/firebase/auth';
	import { alertTextState, alertTypeState } from '$lib/store';
	import isValidEmailFormat from '$lib/validation/isValidEmailFormat';

	import { authLoginPage, policyPage } from '$utils/pages';
	import { onMount } from 'svelte';

	let email = '';

	let emailRef: HTMLInputElement;

	onMount(() => {
		emailRef.focus();
		alertTypeState.set('warning');
		alertTextState.set('Be aware! Reset Emails will often go to your spam folder!');
	});

	const requestReset = () => {
		if (!isValidEmailFormat(email)) return;

		firebaseSendPasswordResetEmail(email)
			.then(() => goto(authLoginPage))
			.catch(() => null)
			.finally(() => analyticResetRequest(email));
	};
</script>

<LoginContainer>
	<LoginFormContainer label="Please enter your email to request a reset">
		<EmailInput bind:ref={emailRef} bind:value={email} on:enter={requestReset} />

		<ResetButton on:click={requestReset} />

		<div class="flex gap-1 justify-center">
			<p class="text-xs">Remember your password?</p>

			<a class="text-xs anchor" href={authLoginPage}>Login</a>
		</div>

		<p class="text-xs text-center">
			<a class="anchor text-surface-300 dark:text-surface-400" href={policyPage}>Privacy Policy</a>
		</p>
	</LoginFormContainer>
</LoginContainer>
