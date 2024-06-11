<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import IconTextMultiple from '~icons/mdi/comment-text-multiple';

	export let value: string = '';
	export let ref: HTMLTextAreaElement | null = null;

	const dispatch = createEventDispatcher();
	const enter = () => dispatch('enter');
</script>

<div class="input-group input-group-divider border-none grid-cols-[auto_1fr_auto]">
	<div class="input-group-shim">
		<slot><IconTextMultiple /></slot>
	</div>
	<textarea
		class="textarea border-none rounded-none"
		rows="4"
		placeholder="Feel free to leave feedback!"
		name="feedback"
		bind:value
		on:keyup={(event) => event.key === 'Enter' && enter()}
		bind:this={ref}
	/>
</div>
