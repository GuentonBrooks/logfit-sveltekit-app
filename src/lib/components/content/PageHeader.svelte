<script lang="ts">
	export let label: string = '';
	export let subLabel: string = '';
</script>

<div class="grid grid-cols-1 m-5">
	<h1 class="h1 text-secondary-500 dark:text-tertiary-500">#{label}</h1>
	<p class="text-primary-500">{subLabel}</p>
</div>
