<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import FlatAlert from '$lib/components/content/FlatAlert.svelte';
	import LogoWstad from '$lib/components/images/LogoWstad.svelte';
	import SubHeader from '../content/SubHeader.svelte';
	import LogoGuenton from '../images/LogoGuenton.svelte';
	import BannerLogfit from '../images/BannerLogfit.svelte';
	import { isDarkModeState } from '$lib/store';

	export let label: string;
	const toggleDarkMode = () => isDarkModeState.set(!$isDarkModeState);
</script>

<div class="flex flex-col justify-items-center w-full p-10">
	<div class="flex flex-col items-center my-4">
		<BannerLogfit />
		<SubHeader {label} />
	</div>

	<div class="flex-1 flex flex-col gap-8 w-full max-w-md place-self-center">
		<slot />
	</div>

	<div class="flex w-full max-w-lg place-self-center m-3">
		<FlatAlert />
	</div>

	<div class="w-full flex justify-between items-center self-center mt-4 max-w-lg">
		<LogoWstad />
		<LightSwitch
			ring="border-none"
			fillDark="fill-primary-500"
			fillLight="fill-tertiary-500"
			on:click={toggleDarkMode}
		/>
		<LogoGuenton />
	</div>
</div>
