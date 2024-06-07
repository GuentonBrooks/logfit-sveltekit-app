<script lang="ts">
	import { goto } from '$app/navigation';
	import LoginButton from '$lib/components/buttons/LoginButton.svelte';
	import EmailInput from '$lib/components/inputs/EmailInput.svelte';
	import LoginContainer from '$lib/components/containers/LoginContainer.svelte';
	import LoginFormContainer from '$lib/components/containers/LoginFormContainer.svelte';
	import PasswordInput from '$lib/components/inputs/PasswordInput.svelte';
	import { analyticSignUpRequest } from '$lib/firebase/analytics';
	import { firebasePasswordSignUp } from '$lib/firebase/auth';
	import isValidSignupFormat from '$lib/validation/isValidSignupFormat';

	import { authLoginPage, homePage, policyPage } from '$utils/pages';

	let email = '';
	let password = '';
	let passwordConfirm = '';

	let emailRef: HTMLInputElement;
	let passwordRef: HTMLInputElement;
	let passwordConfirmRef: HTMLInputElement;

	const signup = () => {
		const signupFormat = { email, password, passwordConfirm };
		if (!isValidSignupFormat(signupFormat)) return;

		firebasePasswordSignUp(email, password)
			.then(() => goto(homePage))
			.catch(() => null)
			.finally(() => analyticSignUpRequest(email));
	};
</script>

<LoginContainer>
	<LoginFormContainer label="Welcome, please login to continue">
		<EmailInput bind:ref={emailRef} bind:value={email} />
		<PasswordInput bind:ref={passwordRef} bind:value={password} />
		<PasswordInput
			bind:ref={passwordConfirmRef}
			bind:value={passwordConfirm}
			on:enter={signup}
			placeholder="Confirm Password"
		/>

		<LoginButton on:click={signup} />

		<div class="flex gap-1 justify-center">
			<p class="text-xs">Already have an account?</p>

			<a class="text-xs anchor" href={authLoginPage}>Login</a>
		</div>

		<p class="text-xs text-center">
			<a class="anchor text-surface-300 dark:text-surface-400" href={policyPage}>Privacy Policy</a>
		</p>
	</LoginFormContainer>
</LoginContainer>
