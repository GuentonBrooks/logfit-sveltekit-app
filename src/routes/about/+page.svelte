<script lang="ts">
	import PageHeader from '$lib/components/content/PageHeader.svelte';
	import SurfaceContainer from '$lib/components/containers/SurfaceContainer.svelte';
	import SurfaceHeader from '$lib/components/content/SurfaceHeader.svelte';
	import MaterialInput from '$lib/components/inputs/MaterialInput.svelte';

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { authLoginPage, homePage } from '$utils/pages';
	import { getFirebaseUserId, storeFirebaseFeedbackAsync } from '$lib/firebase/auth';
	import IconAppBrackets from '~icons/mdi/application-brackets';
	import IconUpload from '~icons/mdi/upload-circle';
	import IconRfcCheck from '~icons/mdi/check-all';
	import IconBugCheck from '~icons/mdi/bug-check';
	import FeedbackInput from '$lib/components/inputs/FeedbackInput.svelte';
	import LogoGuenton from '$lib/components/images/LogoGuenton.svelte';
	import MaterialFab from '$lib/components/buttons/MaterialFab.svelte';

	let uid = '';
	let feedback = '';

	onMount(() => {
		uid = getFirebaseUserId();
		if (!uid) return goto(authLoginPage);
	});

	const sendFeedback = () =>
		storeFirebaseFeedbackAsync(uid, feedback).then(() => goto(homePage).catch(() => {}));
</script>

<PageHeader label="About" subLabel="General Information about this application" />
<SurfaceContainer>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-8 pb-2 mt-4 mx-4">
		<SurfaceHeader label="Current App Version" />
		<MaterialInput name="version" value="1.1.2">
			<IconAppBrackets />
		</MaterialInput>

		<SurfaceHeader label="Changes this version" />
		<ul class="list">
			<li>
				<span><IconRfcCheck /></span>
				<span class="flex-auto">Added about section</span>
			</li>
			<li>
				<span><IconRfcCheck /></span>
				<span class="flex-auto">Made All Logos Clickable</span>
			</li>
			<li>
				<span><IconRfcCheck /></span>
				<span class="flex-auto">Added Remarks Column to Stats Table</span>
			</li>
			<li>
				<span><IconBugCheck /></span>
				<span class="flex-auto">Removed Log ID from Stats Table</span>
			</li>
		</ul>

		<SurfaceHeader label="Feedback" />
		<div class="flex gap-3">
			<FeedbackInput bind:value={feedback} />
			<MaterialFab on:click={sendFeedback}>
				<IconUpload />
			</MaterialFab>
		</div>

		<SurfaceHeader label="Powered By" />
		<a href="mailto:guenton@gmail.com" class="mt-2"><LogoGuenton /></a>
	</div>
</SurfaceContainer>
