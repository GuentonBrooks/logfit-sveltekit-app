<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { authLoginPage, logsPage } from '$utils/pages';
	import { getFirebaseUserId } from '$lib/firebase/auth';
	import PageHeader from '$lib/components/content/PageHeader.svelte';
	import SurfaceContainer from '$lib/components/containers/SurfaceContainer.svelte';
	import SurfaceHeader from '$lib/components/content/SurfaceHeader.svelte';
	import type { Unsubscriber } from 'svelte/store';
	import { onValue } from 'firebase/database';
	import { getAllWorkoutLogRef, getUserLogRef } from '$lib/firebase/log';
	import type { FirebaseWorkoutLogFormat, WorkoutLogTableRowFormat } from '$lib/types/log';
	import { Table, tableMapperValues, type TableSource } from '@skeletonlabs/skeleton';

	let myLogTable: WorkoutLogTableRowFormat[] = [];
	let allLogTable: WorkoutLogTableRowFormat[] = [];
	let unsubMyLogs: Unsubscriber;
	let unsubAllLogs: Unsubscriber;

	const setMyTableSource = (): TableSource => ({
		head: ['First Name', 'Last Name', 'Date', 'Duration', 'Reps', 'Remarks'],
		body: tableMapperValues(myLogTable, [
			'firstName',
			'lastName',
			'date',
			'duration',
			'reps',
			'remarks',
		]),
		meta: tableMapperValues(myLogTable, ['key']),
		foot: ['Total Logs', `<span class="badge variant-soft-primary">${myLogTable.length}<span>`],
	});

	const setAllTableSource = (): TableSource => ({
		head: ['First Name', 'Last Name', 'Date', 'Duration', 'Reps', 'Remarks'],
		body: tableMapperValues(allLogTable, [
			'firstName',
			'lastName',
			'date',
			'duration',
			'reps',
			'remarks',
		]),
		meta: tableMapperValues(allLogTable, ['key']),
		foot: ['Total Logs', `<span class="badge variant-soft-primary">${allLogTable.length}<span>`],
	});

	$: myTableData = myLogTable && setMyTableSource();
	$: allTableData = allLogTable && setAllTableSource();

	const onTableRowSelect = (event: CustomEvent) => goto(`${logsPage}/${event.detail}`);

	onMount(() => {
		const userId = getFirebaseUserId();
		if (!userId) goto(authLoginPage);

		unsubMyLogs = onValue(getUserLogRef(userId), (snapshot) => {
			if (!snapshot.exists()) return;

			const list: WorkoutLogTableRowFormat[] = [];

			snapshot.forEach((childSnapshot) => {
				const childKey = childSnapshot.key;
				const childData = childSnapshot.val() as FirebaseWorkoutLogFormat;
				list.push({ key: childKey, ...childData });
			});

			myLogTable = list;
		});

		unsubAllLogs = onValue(getAllWorkoutLogRef(), (snapshot) => {
			if (!snapshot.exists()) return;

			const list: WorkoutLogTableRowFormat[] = [];

			snapshot.forEach((childSnapshot) => {
				const childKey = childSnapshot.key;
				const childData = childSnapshot.val() as FirebaseWorkoutLogFormat;
				list.push({ key: childKey, ...childData });
			});

			allLogTable = list;
		});
	});

	onDestroy(() => {
		if (unsubMyLogs) unsubMyLogs();
		if (unsubAllLogs) unsubAllLogs();
	});
</script>

<PageHeader label="Stats" subLabel="Extra Statistical Data for Nerds" />
<SurfaceContainer>
	<SurfaceHeader label="My Workout Logs" />
	<Table interactive source={myTableData} on:selected={onTableRowSelect} />
</SurfaceContainer>

<br />

<SurfaceContainer>
	<SurfaceHeader label="All Workout Logs" />
	<Table interactive source={allTableData} on:selected={onTableRowSelect} />
</SurfaceContainer>
