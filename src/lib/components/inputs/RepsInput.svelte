<script lang="ts">
	import IconCounter from '~icons/mdi/counter';
	import { createEventDispatcher } from 'svelte';

	export let value: string;
	export let ref: HTMLInputElement | null = null;

	const dispatch = createEventDispatcher();
	const enter = () => dispatch('enter');
</script>

<div class="input-group input-group-divider border-none grid-cols-[auto_1fr_auto]">
	<div class="input-group-shim"><IconCounter /></div>
	<input
		class="input border-none rounded-none"
		type="number"
		name="reps"
		autocomplete="off"
		placeholder="Total Reps"
		bind:value
		on:keyup={(event) => event.key === 'Enter' && enter()}
		bind:this={ref}
	/>
</div>
