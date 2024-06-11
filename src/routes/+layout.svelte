<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';
	import '../app.postcss';
	import Analytics from '$lib/components/content/Analytics.svelte';
</script>

<Analytics />

<AppShell>
	<slot />
</AppShell>
