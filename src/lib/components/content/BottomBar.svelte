<script>
	import { AppBar } from '@skeletonlabs/skeleton';

	import LogoGuenton from '../images/LogoGuenton.svelte';
	import LogoWstad from '../images/LogoWstad.svelte';
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<a href="http://www.crossfitwillemstad.com/" target="_blank"><LogoWstad /></a>
		<p class="ml-5 text-xs">Copyright © 2024. Crossfit Willemstad</p>
	</svelte:fragment>

	<svelte:fragment slot="trail">
		<p class="text-xs">Powered By</p>
		<a href="mailto:guenton@gmail.com"><LogoGuenton /></a>
	</svelte:fragment>
</AppBar>
