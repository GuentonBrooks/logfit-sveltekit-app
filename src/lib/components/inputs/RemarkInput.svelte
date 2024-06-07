<script lang="ts">
	import IconComment from '~icons/mdi/comment-processing';
	import { createEventDispatcher } from 'svelte';

	export let value: string;
	export let ref: HTMLInputElement | null = null;

	const dispatch = createEventDispatcher();
	const enter = () => dispatch('enter');
</script>

<div class="input-group input-group-divider border-none grid-cols-[auto_1fr_auto]">
	<div class="input-group-shim"><IconComment /></div>
	<input
		class="input border-none rounded-none"
		type="text"
		name="remark"
		autocomplete="off"
		placeholder="Remarks"
		bind:value
		on:keyup={(event) => event.key === 'Enter' && enter()}
		bind:this={ref}
	/>
</div>
