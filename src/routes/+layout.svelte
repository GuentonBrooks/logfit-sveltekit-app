<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';
	import '../app.postcss';
	import Analytics from '$lib/components/content/Analytics.svelte';
	import Umami from '$lib/components/content/Umami.svelte';
</script>

<Analytics />
<Umami />

<AppShell>
	<slot />
</AppShell>
