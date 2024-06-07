<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { authLoginPage } from '$utils/pages';
	import { getFirebaseUserId } from '$lib/firebase/auth';
	import PageHeader from '$lib/components/content/PageHeader.svelte';
	import SurfaceContainer from '$lib/components/containers/SurfaceContainer.svelte';
	import SurfaceHeader from '$lib/components/content/SurfaceHeader.svelte';

	onMount(() => {
		const userId = getFirebaseUserId();
		if (!userId) goto(authLoginPage);
	});
</script>

<PageHeader label="Stats" subLabel="View Your Stats" />
<SurfaceContainer>
	<SurfaceHeader label="Stats" />
</SurfaceContainer>
