<script>
	import { createEventDispatcher } from 'svelte';
	import IconLogin from '~icons/mdi/login-variant';

	export let disabled = false;

	const dispatch = createEventDispatcher();
	const click = () => dispatch('click');
</script>

<button
	class="btn btn-lg px-6 variant-filled-primary dark:variant-filled-secondary w-full max-w-md"
	{disabled}
	on:click={click}
>
	<span>Login</span>
	<IconLogin />
</button>
