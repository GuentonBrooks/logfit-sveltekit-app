<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import IconLock from '~icons/mdi/lock';

	export let value: string = '';
	export let ref: HTMLInputElement | null = null;
	export let placeholder: string = 'Password';

	const dispatch = createEventDispatcher();
	const enter = () => dispatch('enter');
</script>

<div class="input-group input-group-divider border-none grid-cols-[auto_1fr_auto]">
	<div class="input-group-shim"><IconLock /></div>
	<input
		class="input border-none rounded-none"
		type="password"
		name="password"
		autocomplete="current-password"
		{placeholder}
		bind:value
		on:keyup={(event) => event.key === 'Enter' && enter()}
		bind:this={ref}
	/>
</div>
