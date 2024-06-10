<script lang="ts">
	import PageHeader from '$lib/components/content/PageHeader.svelte';
	import SurfaceContainer from '$lib/components/containers/SurfaceContainer.svelte';
	import SurfaceHeader from '$lib/components/content/SurfaceHeader.svelte';
	import MaterialInput from '$lib/components/inputs/MaterialInput.svelte';
	import SubmitButton from '$lib/components/buttons/SubmitButton.svelte';
	import SecureEmailCheckBox from '$lib/components/inputs/SecureEmailCheckBox.svelte';

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { authLoginPage, homePage, rootPage } from '$utils/pages';
	import { analyticsDeleteUserEvent, analyticsUpdateUserEvent } from '$lib/firebase/analytics';
	import {
		firebaseSignOut,
		getFirebaseDisplayName,
		getFirebaseUserEmail,
		getFirebaseUserId,
		removeFirebaseUserAsync,
		storeFirebaseUserAsync,
	} from '$lib/firebase/auth';
	import IconAccount from '~icons/mdi/account';
	import IconAt from '~icons/mdi/at';
	import isValidFirebaseUserFormat from '$lib/validation/isValidFirebaseUserFormat';
	import type { FirebaseDatabaseUserFormat } from '$lib/types/auth';
	import DeleteButton from '$lib/components/buttons/DeleteButton.svelte';

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

	const purge = () => {
		removeFirebaseUserAsync(uid)
			.then(() => firebaseSignOut())
			.then(() => goto(rootPage))
			.catch(() => null)
			.finally(() => analyticsDeleteUserEvent(getFirebaseUserId()));
	};
</script>

<PageHeader label="User Information" subLabel="Adjust your user information" />
<SurfaceContainer>
	<SurfaceHeader label="Personal Information" />
	<div class="grid grid-cols-1 md:grid-cols-2 gap-8 pb-2 mt-4 mx-4">
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
	</div>

	<div class="flex items-center justify-center gap-8 my-5 mx-4 mt-8">
		<SubmitButton on:click={store} />
		<DeleteButton on:click={purge} />
	</div>
</SurfaceContainer>
