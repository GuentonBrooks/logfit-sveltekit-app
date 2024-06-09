<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value: boolean;

	const dispatch = createEventDispatcher();
	const enter = () => dispatch('enter');
</script>

<div class="">
	<label class="flex items-center space-x-2">
		<input class="checkbox" type="checkbox" bind:checked={value} />
		<p>Please hide my Email for security reasons</p>
	</label>
</div>
