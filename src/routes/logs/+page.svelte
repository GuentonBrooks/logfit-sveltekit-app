<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { authLoginPage } from '$utils/pages';
	import { getFirebaseUserId } from '$lib/firebase/auth';
	import PageHeader from '$lib/components/content/PageHeader.svelte';
	import SurfaceContainer from '$lib/components/containers/SurfaceContainer.svelte';
	import SurfaceHeader from '$lib/components/content/SurfaceHeader.svelte';
	import DateInput from '$lib/components/inputs/DateInput.svelte';
	import TimeInput from '$lib/components/inputs/TimeInput.svelte';
	import RepsInput from '$lib/components/inputs/RepsInput.svelte';
	import RemarkInput from '$lib/components/inputs/RemarkInput.svelte';
	import SubmitButton from '$lib/components/buttons/SubmitButton.svelte';

	let date: string;
	let duration: string;
	let reps: string;
	let remarks: string;

	onMount(() => {
		const userId = getFirebaseUserId();
		if (!userId) goto(authLoginPage);
	});
</script>

<PageHeader label="Logs" subLabel="Enter a new workout log" />
<SurfaceContainer>
	<SurfaceHeader label="New Entry" />
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-2 mt-4">
		<DateInput value={date} />
		<TimeInput value={duration} />
		<RepsInput value={reps} />
		<RemarkInput value={remarks} />
	</div>

	<div class="flex items-center justify-center my-5 mt-8">
		<SubmitButton />
	</div>
</SurfaceContainer>
