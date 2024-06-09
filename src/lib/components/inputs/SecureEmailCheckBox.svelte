<script lang="ts">
	export let value: boolean;
</script>

<div class="">
	<label class="flex items-center space-x-2">
		<input class="checkbox" type="checkbox" name="hideEmail" bind:checked={value} />
		<p>Please hide my Email for security reasons</p>
	</label>
</div>
