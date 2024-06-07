<script>
	import { page } from '$app/stores';
	import { TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import { homePage, logsPage, statsPage } from '$utils/pages';
</script>

<TabGroup
	class="bg-transparent w-full text-secondary-500 dark:text-tertiary-500"
	justify="justify-center"
	active="underline hover:text-primary-500"
	hover="hover:text-primary-500"
	flex="flex-1 lg:flex-none"
	rounded=""
	border=""
>
	<TabAnchor href={homePage} selected={$page.url.pathname.startsWith(homePage)}>
		<span>Home</span>
	</TabAnchor>

	<TabAnchor href={logsPage} selected={$page.url.pathname.startsWith(logsPage)}>
		<span>Logs</span>
	</TabAnchor>

	<TabAnchor href={statsPage} selected={$page.url.pathname.startsWith(statsPage)}>
		<span>Stats</span>
	</TabAnchor>
</TabGroup>
