<script>
	import { createEventDispatcher } from 'svelte';
	import IconAccountPlus from '~icons/mdi/account-sync';

	export let disabled = false;

	const dispatch = createEventDispatcher();
	const click = () => dispatch('click');
</script>

<button class="btn px-6 variant-filled-warning w-full max-w-md" {disabled} on:click={click}>
	<span>Reset</span>
	<IconAccountPlus />
</button>
