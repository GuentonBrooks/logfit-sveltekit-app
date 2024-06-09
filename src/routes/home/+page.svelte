<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { authLoginPage, authUserPage, userPage } from '$utils/pages';
	import {
		fetchFirebaseUserInfo,
		getFirebaseUserId,
		setFirebaseUserToState,
	} from '$lib/firebase/auth';
	import PageHeader from '$lib/components/content/PageHeader.svelte';
	import SurfaceContainer from '$lib/components/containers/SurfaceContainer.svelte';
	import SurfaceHeader from '$lib/components/content/SurfaceHeader.svelte';

	onMount(() => {
		const userId = getFirebaseUserId();
		if (!userId) return goto(authLoginPage);

		fetchFirebaseUserInfo()
			.then((firebaseUser) => {
				// If user isn't stored yet, redirect to additional info fillout page
				if (!firebaseUser) return goto(userPage);

				// Otherwise, set user to state
				setFirebaseUserToState(firebaseUser);
			})
			.catch(() => null);
	});
</script>

<PageHeader label="Rankings" subLabel="View Current Rankings" />
<SurfaceContainer>
	<SurfaceHeader label="Grand Totals" />
</SurfaceContainer>

<div class="flex flex-col md:flex-row gap-5 pb-2 mt-4">
	<div class="flex-1">
		<SurfaceContainer>
			<SurfaceHeader label="Today" />
		</SurfaceContainer>
	</div>

	<div class="flex-1">
		<SurfaceContainer>
			<SurfaceHeader label="My Stats" />
		</SurfaceContainer>
	</div>
</div>
