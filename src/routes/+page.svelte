<script lang="ts">
	import LoginContainer from '$lib/components/containers/LoginContainer.svelte';
	import LoginFormContainer from '$lib/components/containers/LoginFormContainer.svelte';

	import { policyPage } from '$utils/pages';
	import { ProgressBar } from '@skeletonlabs/skeleton';
</script>

<LoginContainer>
	<LoginFormContainer label="Loading...">
		<ProgressBar meter="bg-primary-500 dark:bg-secondary-500" />

		<p class="text-xs text-center">
			<a class="anchor text-surface-300 dark:text-surface-400" href={policyPage}>Privacy Policy</a>
		</p>
	</LoginFormContainer>
</LoginContainer>
