<script>
	import { createEventDispatcher } from 'svelte';
	import IconRestart from '~icons/mdi/restart';

	export let disabled = false;

	const dispatch = createEventDispatcher();
	const click = () => dispatch('click');
</script>

<button class="btn btn-lg px-6 variant-soft-tertiary w-full max-w-md" {disabled} on:click={click}>
	<IconRestart />
	<span>Restart</span>
</button>
