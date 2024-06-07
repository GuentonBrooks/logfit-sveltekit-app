<script>
</script>

<div class="h-full">
	<!-- Small Screen -->
	<div class="block md:hidden h-screen">
		<slot />
	</div>

	<!-- Large Screen -->
	<div class="hidden md:block">
		<div class="h-screen flex bg-cover bg-center bg-no-repeat bg-fixed login-background">
			<div class="flex-1 flex justify-center items-center bg-surface-50/60 dark:bg-surface-900/60">
				<div class="w-2/4 lg:w-1/3 my-20 flex bg-surface-100-800-token rounded shadow">
					<slot />
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.login-background {
		background-image: url('/images/background.jpg');
	}
</style>
