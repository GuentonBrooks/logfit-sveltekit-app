<script>
	import { createEventDispatcher } from 'svelte';
	import IconDelete from '~icons/mdi/delete-alert';

	export let disabled = false;

	const dispatch = createEventDispatcher();
	const click = () => dispatch('click');
</script>

<button class="btn px-6 variant-filled-warning w-full max-w-md" {disabled} on:click={click}>
	<span>Delete</span>
	<IconDelete />
</button>
