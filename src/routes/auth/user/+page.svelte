<script lang="ts">
	import LoginContainer from '$lib/components/containers/LoginContainer.svelte';
	import LoginFormContainer from '$lib/components/containers/LoginFormContainer.svelte';
	import MaterialInput from '$lib/components/inputs/MaterialInput.svelte';
	import SecureEmailCheckBox from '$lib/components/inputs/SecureEmailCheckBox.svelte';
	import SubmitButton from '$lib/components/buttons/SubmitButton.svelte';

	import IconAt from '~icons/mdi/at';
	import IconAccount from '~icons/mdi/account';
	import type { FirebaseDatabaseUserFormat } from '$lib/types/auth';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { authLoginPage, homePage, policyPage } from '$utils/pages';
	import isValidFirebaseUserFormat from '$lib/validation/isValidFirebaseUserFormat';
	import { analyticsUpdateUserEvent } from '$lib/firebase/analytics';
	import {
		getFirebaseDisplayName,
		getFirebaseUserEmail,
		getFirebaseUserId,
		storeFirebaseUserAsync,
	} from '$lib/firebase/auth';

	let uid = '';
	let firstName = '';
	let lastName = '';
	let email = '';

	let isSecuredEmail = true;
	$: setEmailValue(isSecuredEmail);

	const setEmailValue = (isSecured: boolean) => {
		email = isSecured ? '******' : getFirebaseUserEmail();
	};

	let firstNameRef: HTMLInputElement;
	let lastNameRef: HTMLInputElement;

	onMount(() => {
		firstNameRef.focus();
		uid = getFirebaseUserId();
		if (!uid) return goto(authLoginPage);

		const fullName = getFirebaseDisplayName();
		if (!fullName) return;
		[firstName, lastName] = fullName.split(' ');
	});

	const store = () => {
		const userFormat: FirebaseDatabaseUserFormat = {
			uid,
			firstName,
			lastName,
			email,
			isAdmin: false,
		};
		if (!isValidFirebaseUserFormat(userFormat)) return;

		storeFirebaseUserAsync(userFormat)
			.then(() => goto(homePage))
			.catch(() => null)
			.finally(() => analyticsUpdateUserEvent(uid));
	};
</script>

<LoginContainer>
	<LoginFormContainer label="We're missing some basic information, please provide them below">
		<MaterialInput
			bind:value={firstName}
			bind:ref={firstNameRef}
			on:enter={() => lastNameRef.focus()}
			name="firstName"
			placeholder="First Name"
		>
			<IconAccount />
		</MaterialInput>

		<MaterialInput
			bind:value={lastName}
			bind:ref={lastNameRef}
			name="lastName"
			placeholder="Last Name"
		/>

		<div class="flex flex-col gap-2 items-center">
			<MaterialInput bind:value={email} name="email" placeholder="Email" disabled>
				<IconAt />
			</MaterialInput>

			<SecureEmailCheckBox bind:value={isSecuredEmail} />
		</div>

		<SubmitButton on:click={store} />

		<p class="text-xs text-center">
			<a class="anchor text-surface-300 dark:text-surface-400" href={policyPage}>Privacy Policy</a>
		</p>
	</LoginFormContainer>
</LoginContainer>
