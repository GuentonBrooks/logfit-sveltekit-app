<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { authLoginPage, logsPage, userPage } from '$utils/pages';
	import {
		fetchFirebaseUserInfo,
		getFirebaseUserId,
		setFirebaseUserToState,
	} from '$lib/firebase/auth';
	import PageHeader from '$lib/components/content/PageHeader.svelte';
	import SurfaceContainer from '$lib/components/containers/SurfaceContainer.svelte';
	import SurfaceHeader from '$lib/components/content/SurfaceHeader.svelte';
	import { onValue } from 'firebase/database';
	import { getAllUserWorkoutLogRef, getAllWorkoutLogRef, getUserLogRef } from '$lib/firebase/log';
	import type { Unsubscriber } from 'svelte/store';
	import type { FirebaseWorkoutLogFormat, StandingsTableRowFormat } from '$lib/types/log';
	import { Table, tableMapperValues, type TableSource } from '@skeletonlabs/skeleton';

	let myTtlEntries: number = 0;
	let myTtlDuration: number = 0;
	let myTtlReps: number = 0;

	let groupTtlEntries: number = 0;
	let groupTtlDuration: number = 0;
	let groupTtlReps: number = 0;

	let grandTotalTable: StandingsTableRowFormat[] = [];

	let unsubMyLogs: Unsubscriber;
	let unsubAllUserLogs: Unsubscriber;

	const setGrandTotalTableSource = (): TableSource => ({
		head: ['First Name', 'Last Name', 'Log Entries', 'Total Workout Minutes', 'Total Workout Reps'],
		body: tableMapperValues(grandTotalTable, [
			'firstName',
			'lastName',
			'ttlEntries',
			'ttlDuration',
			'ttlReps',
		]),
		meta: tableMapperValues(grandTotalTable, ['key']),
		foot: [
			'Total Users in Ranking',
			`<span class="badge variant-soft-primary">${grandTotalTable.length}<span>`,
			`<span class="badge variant-soft-primary">${groupTtlEntries}<span>`,
			`<span class="badge variant-soft-primary">${groupTtlDuration}<span>`,
			`<span class="badge variant-soft-primary">${groupTtlReps}<span>`,
		],
	});

	$: grandTotalTableData = grandTotalTable && setGrandTotalTableSource();

	const onTableRowSelect = (event: CustomEvent) => console.log(event.detail);

	onMount(() => {
		const userId = getFirebaseUserId();
		if (!userId) return goto(authLoginPage);

		fetchFirebaseUserInfo()
			.then((firebaseUser) => {
				if (!firebaseUser) return goto(userPage);
				setFirebaseUserToState(firebaseUser);
			})
			.catch(() => null);

		unsubMyLogs = onValue(getUserLogRef(userId), (snapshot) => {
			if (!snapshot.exists()) return;

			snapshot.forEach((childSnapshot) => {
				const childData = childSnapshot.val() as FirebaseWorkoutLogFormat;
				myTtlDuration = myTtlDuration + childData.duration;
				myTtlReps = myTtlReps + childData.reps;
				myTtlEntries = snapshot.size;
			});
		});

		unsubAllUserLogs = onValue(getAllUserWorkoutLogRef(), (snapshot) => {
			if (!snapshot.exists()) return;

			const list: StandingsTableRowFormat[] = [];

			snapshot.forEach((childSnapshot) => {
				const row: StandingsTableRowFormat = {
					uid: '',
					email: '',
					firstName: '',
					lastName: '',
					ttlEntries: 0,
					ttlDuration: 0,
					ttlReps: 0,
				};

				childSnapshot.forEach((grandChildSnapshot) => {
					const grandChildKey = grandChildSnapshot.key;
					const grandChildData = grandChildSnapshot.val() as FirebaseWorkoutLogFormat;

					row.uid = grandChildKey;
					row.email = grandChildData.email;
					row.firstName = grandChildData.firstName;
					row.lastName = grandChildData.lastName;
					row.ttlEntries = childSnapshot.size;
					row.ttlDuration = row.ttlDuration + grandChildData.duration;
					row.ttlReps = row.ttlReps + grandChildData.reps;

					groupTtlDuration = groupTtlDuration + grandChildData.duration;
					groupTtlReps = groupTtlReps + grandChildData.reps;
				});

				groupTtlEntries = groupTtlEntries + row.ttlEntries;
				list.push(row);
			});

			list.sort((a, b) => b.ttlReps - a.ttlReps);

			grandTotalTable = list;
		});
	});

	onDestroy(() => {
		if (unsubMyLogs) unsubMyLogs();
		if (unsubAllUserLogs) unsubAllUserLogs();
	});
</script>

<PageHeader label="Rankings" subLabel="View Current Rankings" />
<SurfaceContainer>
	<SurfaceHeader label="Totals" />
	<Table interactive source={grandTotalTableData} on:selected={onTableRowSelect} />
</SurfaceContainer>

<div class="flex flex-col md:flex-row gap-5 pb-2 mt-4">
	<div class="flex-1">
		<SurfaceContainer>
			<SurfaceHeader label=" Group Totals" />
			<div class="flex justify-between m-4">
				<h3 class="h3">Log Entries:</h3>
				<h3 class="h3 text-primary-500">{groupTtlEntries}</h3>
			</div>
			<div class="flex justify-between m-4">
				<h3 class="h3">Workout Minutes:</h3>
				<h3 class="h3 text-primary-500">{groupTtlDuration}</h3>
			</div>
			<div class="flex justify-between m-4">
				<h3 class="h3">Workout Reps:</h3>
				<h3 class="h3 text-primary-500">{groupTtlReps}</h3>
			</div>
		</SurfaceContainer>
	</div>

	<div class="flex-1">
		<SurfaceContainer>
			<SurfaceHeader label="My Totals" />
			<div class="flex justify-between m-4">
				<h3 class="h3">Log Entries:</h3>
				<h3 class="h3 text-primary-500">{myTtlEntries}</h3>
			</div>
			<div class="flex justify-between m-4">
				<h3 class="h3">Workout Minutes:</h3>
				<h3 class="h3 text-primary-500">{myTtlDuration}</h3>
			</div>
			<div class="flex justify-between m-4">
				<h3 class="h3">Workout Reps:</h3>
				<h3 class="h3 text-primary-500">{myTtlReps}</h3>
			</div>
		</SurfaceContainer>
	</div>
</div>
