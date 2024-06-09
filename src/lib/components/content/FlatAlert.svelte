<script lang="ts">
	import { scale } from 'svelte/transition';

	import IconInformation from '~icons/mdi/information-variant';
	import IconPlay from '~icons/mdi/play';
	import IconPause from '~icons/mdi/pause';
	import IconStop from '~icons/mdi/stop';
	import IconChatQuestion from '~icons/mdi/chat-question';
	import IconClose from '~icons/mdi/close';

	import { alertTextState, alertTypeState } from '$lib/store';

	const dismissAlert = () => {
		alertTypeState.set('');
		alertTextState.set('');
	};
</script>

{#if $alertTypeState === 'info' && $alertTextState}
	<button
		type="button"
		class="flex items-center gap-2 p-4 rounded variant-soft shadow-xl w-full"
		in:scale={{ duration: 500, opacity: 0.5, start: 0.5 }}
		on:click={dismissAlert}
	>
		<div class="btn-icon variant-soft-primary">
			<IconInformation />
		</div>

		<div class="flex-1">{$alertTextState}</div>

		<button type="button" class="btn btn-sm" on:click={dismissAlert}>
			<IconClose />
		</button>
	</button>
{:else if $alertTypeState === 'success' && $alertTextState}
	<button
		type="button"
		class="flex items-center fap-2 p-4 rounded variant-soft-success shadow-xl w-full"
		in:scale={{ duration: 500, opacity: 0.5, start: 0.5 }}
		on:click={dismissAlert}
	>
		<div class="btn-icon variant-soft-success">
			<IconPlay />
		</div>

		<div class="flex-1">{$alertTextState}</div>

		<button type="button" class="btn btn-sm" on:click={dismissAlert}>
			<IconClose />
		</button>
	</button>
{:else if $alertTypeState === 'warning' && $alertTextState}
	<button
		type="button"
		class="flex items-center fap-2 p-4 rounded variant-soft-warning shadow-xl w-full"
		in:scale={{ duration: 500, opacity: 0.5, start: 0.5 }}
		on:click={dismissAlert}
	>
		<div class="btn-icon variant-soft-warning">
			<IconPause />
		</div>

		<div class="flex-1">{$alertTextState}</div>

		<button type="button" class="btn btn-sm" on:click={dismissAlert}>
			<IconClose />
		</button>
	</button>
{:else if $alertTypeState === 'error' && $alertTextState}
	<button
		type="button"
		class="flex items-center fap-2 p-4 rounded variant-soft-error shadow-xl w-full"
		in:scale={{ duration: 500, opacity: 0.5, start: 0.5 }}
		on:click={dismissAlert}
	>
		<div class="btn-icon variant-soft-error">
			<IconStop />
		</div>

		<div class="flex-1">{$alertTextState}</div>

		<button type="button" class="btn btn-sm" on:click={dismissAlert}>
			<IconClose />
		</button>
	</button>
{:else if $alertTextState}
	<button
		type="button"
		class="flex items-center fap-2 p-4 rounded variant-soft shadow-xl w-full"
		in:scale={{ duration: 500, opacity: 0.5, start: 0.5 }}
		on:click={dismissAlert}
	>
		<div class="btn-icon">
			<IconChatQuestion />
		</div>

		<div class="flex-1">{$alertTextState}</div>

		<button type="button" class="btn btn-sm" on:click={dismissAlert}>
			<IconClose />
		</button>
	</button>
{/if}
