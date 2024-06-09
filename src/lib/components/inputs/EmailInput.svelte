<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import IconAt from '~icons/mdi/at';

	export let value: string = '';
	export let ref: HTMLInputElement | null = null;

	const dispatch = createEventDispatcher();
	const enter = () => dispatch('enter');
</script>

<div class="input-group input-group-divider border-none grid-cols-[auto_1fr_auto]">
	<div class="input-group-shim text-primary-500"><IconAt /></div>
	<input
		class="input border-none rounded-none"
		type="email"
		name="email"
		autocomplete="email"
		placeholder="Email"
		bind:value
		on:keyup={(event) => event.key === 'Enter' && enter()}
		bind:this={ref}
	/>
</div>
