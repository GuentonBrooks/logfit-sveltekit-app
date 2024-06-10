<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { authLoginPage, statsPage } from '$utils/pages';
	import { getFirebaseUserId, getUserRef } from '$lib/firebase/auth';

	import IconComment from '~icons/mdi/comment-processing';
	import IconAccount from '~icons/mdi/account';
	import IconAt from '~icons/mdi/at';
	import IconId from '~icons/mdi/identifier';
	import PageHeader from '$lib/components/content/PageHeader.svelte';
	import SurfaceContainer from '$lib/components/containers/SurfaceContainer.svelte';
	import SurfaceHeader from '$lib/components/content/SurfaceHeader.svelte';
	import DateInput from '$lib/components/inputs/DateInput.svelte';
	import TimeInput from '$lib/components/inputs/TimeInput.svelte';
	import RepsInput from '$lib/components/inputs/RepsInput.svelte';
	import SubmitButton from '$lib/components/buttons/SubmitButton.svelte';
	import MaterialInput from '$lib/components/inputs/MaterialInput.svelte';
	import type { Unsubscriber } from 'svelte/store';
	import { onValue } from 'firebase/database';
	import type { FirebaseDatabaseUserFormat } from '$lib/types/auth';
	import type { FirebaseWorkoutLogFormat } from '$lib/types/log';
	import isValidFirebaseWorkoutLogFormat from '$lib/validation/isValidFirebaseWorkoutLogFormat';
	import { storeNewFirebaseWorkoutLogAsync } from '$lib/firebase/log';

	let date: string = '';
	let duration: number;
	let reps: number;
	let remarks: string = '';

	let uid = '';
	let firstName = '';
	let lastName = '';
	let email = '';

	let unsubUserInformation: Unsubscriber;

	const store = () => {
		uid = getFirebaseUserId();
		if (!uid) goto(authLoginPage);

		const logFormat: FirebaseWorkoutLogFormat = {
			uid,
			firstName,
			lastName,
			email,
			date,
			duration,
			reps,
			remarks,
		};
		if (!isValidFirebaseWorkoutLogFormat(logFormat)) return;

		storeNewFirebaseWorkoutLogAsync(logFormat)
			.then(() => goto(statsPage))
			.catch(() => null);
	};

	onMount(() => {
		uid = getFirebaseUserId();
		if (!uid) goto(authLoginPage);

		unsubUserInformation = onValue(getUserRef(uid), (snapshot) => {
			if (!snapshot.exists()) return;

			const data = snapshot.val() as FirebaseDatabaseUserFormat;
			firstName = data.firstName;
			lastName = data.lastName;
			email = data.email;
		});
	});

	onDestroy(() => unsubUserInformation());
</script>

<PageHeader label="Logs" subLabel="Enter a new workout log" />
<SurfaceContainer>
	<SurfaceHeader label="New Entry" />
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 m-4">
		<DateInput bind:value={date} />
		<TimeInput bind:value={duration} />
		<RepsInput bind:value={reps} />
		<MaterialInput bind:value={remarks} name="remarks" placeholder="Remarks">
			<IconComment />
		</MaterialInput>
	</div>

	<br />

	<SurfaceHeader label="Additional Meta Information" />
	<div class="grid grid-cols-1 md:grid-cols-2 gap-8 pb-2 mt-4 mx-4">
		<MaterialInput value={uid} name="uid" placeholder="User Id" disabled>
			<IconId />
		</MaterialInput>

		<MaterialInput value={firstName} name="firstName" placeholder="First Name" disabled>
			<IconAccount />
		</MaterialInput>

		<MaterialInput value={lastName} name="lastName" placeholder="Last Name" disabled />

		<MaterialInput value={email} name="email" placeholder="Email" disabled>
			<IconAt />
		</MaterialInput>
	</div>

	<div class="flex items-center justify-center gap-8 my-5 mx-4 mt-8">
		<SubmitButton on:click={store} />
	</div>
</SurfaceContainer>
