<script>
	import { createEventDispatcher } from 'svelte';
	let src = '/images/google.png';

	export let disabled = false;

	const dispatch = createEventDispatcher();
	const click = () => dispatch('click');
</script>

<button class="btn btn-lg px-6 variant-glass shadow-lg w-full max-w-md" {disabled} on:click={click}>
	<img {src} height="25" width="25" alt="Google Square Logo" />
	<span>Sign in with Google</span>
</button>
