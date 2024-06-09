<script>
	import PrivacyPolicy from '$lib/components/content/PrivacyPolicy.svelte';
	import { LightSwitch } from '@skeletonlabs/skeleton';
</script>

<div class="flex flex-col gap-5 p-5 bg-surface-100-800-token">
	<div class="self-end">
		<LightSwitch ring="border-none" fillDark="fill-tertiary-500" fillLight="fill-tertiary-400" />
	</div>
	<PrivacyPolicy />
</div>
