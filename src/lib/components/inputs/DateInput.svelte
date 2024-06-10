<script lang="ts">
	import IconCalendar from '~icons/mdi/calendar';
	import { createEventDispatcher } from 'svelte';

	export let value: string;
	export let ref: HTMLInputElement | null = null;

	const maxdate = new Date().toISOString().split('T')[0];

	const dispatch = createEventDispatcher();
	const enter = () => dispatch('enter');
</script>

<div class="input-group input-group-divider border-none grid-cols-[auto_1fr_auto]">
	<div class="input-group-shim"><IconCalendar /></div>
	<input
		class="input border-none rounded-none"
		type="date"
		name="date"
		max={maxdate}
		autocomplete="off"
		placeholder="Date"
		bind:value
		on:keyup={(event) => event.key === 'Enter' && enter()}
		bind:this={ref}
	/>
</div>
