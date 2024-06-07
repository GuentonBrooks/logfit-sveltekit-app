<script>
	import { createEventDispatcher } from 'svelte';
	import IconDumbbell from '~icons/mdi/dumbbell';

	export let disabled = false;

	const dispatch = createEventDispatcher();
	const click = () => dispatch('click');
</script>

<button
	class="btn px-6 variant-filled-secondary dark:variant-filled-primary w-full max-w-md"
	{disabled}
	on:click={click}
>
	<span>Submit</span>
	<IconDumbbell />
</button>
