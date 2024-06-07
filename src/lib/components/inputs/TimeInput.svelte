<script lang="ts">
	import IconTimer from '~icons/mdi/timer';
	import { createEventDispatcher } from 'svelte';

	export let value: string;
	export let ref: HTMLInputElement | null = null;

	const dispatch = createEventDispatcher();
	const enter = () => dispatch('enter');
</script>

<div class="input-group input-group-divider border-none grid-cols-[auto_1fr_auto]">
	<div class="input-group-shim"><IconTimer /></div>
	<input
		class="input border-none rounded-none"
		type="time"
		name="duration"
		autocomplete="off"
		placeholder="Workout Duration"
		bind:value
		on:keyup={(event) => event.key === 'Enter' && enter()}
		bind:this={ref}
	/>
</div>
