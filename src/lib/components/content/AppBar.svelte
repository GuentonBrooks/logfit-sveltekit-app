<script>
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import IconLogout from '~icons/mdi/logout-variant';
	import IconAccount from '~icons/mdi/account';

	import MaterialFab from '../buttons/MaterialFab.svelte';
	import Nav from './Nav.svelte';
	import { firebaseSignOut } from '$lib/firebase/auth';
	import { goto } from '$app/navigation';
	import { rootPage, userPage } from '$utils/pages';
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
		<MaterialFab on:click={() => goto(userPage)}>
			<IconAccount />
		</MaterialFab>
		<MaterialFab on:click={logout}>
			<IconLogout />
		</MaterialFab>
	</svelte:fragment>
</AppBar>
