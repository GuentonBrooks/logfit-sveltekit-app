<script>
	import { AppShell } from '@skeletonlabs/skeleton';

	import AppBar from '../content/AppBar.svelte';
	import FlatAlert from '../content/FlatAlert.svelte';
	import Nav from '../content/Nav.svelte';
	import BottomBar from '../content/BottomBar.svelte';
</script>

<AppShell>
	<!-- App Bar -->
	<svelte:fragment slot="header">
		<AppBar />
	</svelte:fragment>

	<!-- Flat Alert -->
	<svelte:fragment slot="pageHeader">
		<div class="m-3">
			<FlatAlert />
		</div>
	</svelte:fragment>

	<!-- Page Content -->
	<div class="h-full p-5 pt-1">
		<slot />
	</div>

	<!-- Footer Bar -->
	<svelte:fragment slot="footer">
		<!-- Nav -->
		<div
			class="flex md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface-100-800-token items-center"
		>
			<Nav />
		</div>
		<!-- Bottom Bar -->
		<div class="hidden md:block bottom-0 left-0 right-0 h-20 bg-surface-100-800-token items-center">
			<BottomBar />
		</div>
	</svelte:fragment>
</AppShell>
