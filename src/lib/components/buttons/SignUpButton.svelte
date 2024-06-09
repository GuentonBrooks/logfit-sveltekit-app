<script>
	import { createEventDispatcher } from 'svelte';
	import IconAccountPlus from '~icons/mdi/account-plus';

	export let disabled = false;

	const dispatch = createEventDispatcher();
	const click = () => dispatch('click');
</script>

<button
	class="btn px-6 variant-filled-primary dark:variant-filled-secondary w-full max-w-md"
	{disabled}
	on:click={click}
>
	<span>Sign Up</span>
	<IconAccountPlus />
</button>
