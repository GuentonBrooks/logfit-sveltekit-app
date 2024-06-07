<script>
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';

	import LogoutFab from '../buttons/LogoutFab.svelte';
	import Nav from './Nav.svelte';
	import { firebaseSignOut } from '$lib/firebase/auth';
	import { goto } from '$app/navigation';
	import { rootPage } from '$utils/pages';
	import { isDarkModeState } from '$lib/store';
	import LogoLogfit from '../images/LogoLogfit.svelte';

	const logout = () => firebaseSignOut().then(() => goto(rootPage));
	const toggleDarkMode = () => isDarkModeState.set(!$isDarkModeState);
</script>

<AppBar shadow="shadow-2xl">
	<svelte:fragment slot="lead">
		<LogoLogfit />
	</svelte:fragment>

	<div class="hidden md:flex mx-auto">
		<Nav />
	</div>

	<svelte:fragment slot="trail">
		<LightSwitch
			ring="border-none"
			fillDark="fill-primary-500"
			fillLight="fill-tertiary-500"
			on:click={toggleDarkMode}
		/>
		<LogoutFab on:click={logout} />
	</svelte:fragment>
</AppBar>
