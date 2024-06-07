<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import GoogleSigninButton from '$lib/components/buttons/GoogleSigninButton.svelte';
	import LoginButton from '$lib/components/buttons/LoginButton.svelte';
	import EmailInput from '$lib/components/inputs/EmailInput.svelte';
	import LoginContainer from '$lib/components/containers/LoginContainer.svelte';
	import LoginFormContainer from '$lib/components/containers/LoginFormContainer.svelte';
	import PasswordInput from '$lib/components/inputs/PasswordInput.svelte';
	import OrBarHorizontal from '$lib/components/content/OrBarHorizontal.svelte';

	import isValidLoginFormat from '$lib/validation/isValidLoginFormat';
	import { authForgotPage, authSignupPage, homePage, policyPage } from '$utils/pages';
	import { analyticEmailAndPasswordSignIn, analyticGoogleSignIn } from '$lib/firebase/analytics';
	import { firebasePasswordSignIn, googleSignInRedirect } from '$lib/firebase/auth';

	let email: string = '';
	let password: string = '';

	let emailRef: HTMLInputElement;
	let passwordRef: HTMLInputElement;

	onMount(() => emailRef.focus());

	const loginGoogle = () => {
		analyticGoogleSignIn();
		googleSignInRedirect();
	};

	const login = () => {
		const loginFormat = { email, password };
		if (!isValidLoginFormat(loginFormat)) return;

		firebasePasswordSignIn(email, password)
			.then(() => goto(homePage))
			.catch(() => null)
			.finally(() => analyticEmailAndPasswordSignIn());
	};
</script>

<LoginContainer>
	<LoginFormContainer label="Welcome, please login to continue">
		<GoogleSigninButton on:click={loginGoogle} />

		<OrBarHorizontal />

		<EmailInput bind:ref={emailRef} bind:value={email} />

		<div class="w-full max-w-md">
			<PasswordInput bind:ref={passwordRef} bind:value={password} on:enter={login} />
			<p class="text-xs flex mt-1">
				<span class="flex-1" />
				<a class="anchor" href={authForgotPage}>Forgot Password?</a>
			</p>
		</div>

		<LoginButton on:click={login} />

		<div class="flex gap-1 justify-center">
			<p class="text-xs">Don't have an account?</p>

			<a class="text-xs anchor" href={authSignupPage}>Sign Up</a>
		</div>

		<p class="text-xs text-center">
			<a class="anchor text-surface-300 dark:text-surface-400" href={policyPage}>Privacy Policy</a>
		</p>
	</LoginFormContainer>
</LoginContainer>
