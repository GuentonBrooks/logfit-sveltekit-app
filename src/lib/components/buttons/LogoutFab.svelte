<script>
	import { createEventDispatcher } from 'svelte';
	import IconLogout from '~icons/mdi/logout-variant';

	export let disabled = false;

	const dispatch = createEventDispatcher();
	const click = () => dispatch('click');
</script>

<button class="btn btn-icon bg-transparent text-primary-500" {disabled} on:click={click}>
	<IconLogout />
</button>
