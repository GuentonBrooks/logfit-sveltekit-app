<script>
	let srcLight = '/images/logoLight.png';
	let srcDark = '/images/logoDark.png';
</script>

<div class="block dark:hidden">
	<img src={srcLight} alt="Logfit Logo" width="150" height="50" />
</div>

<div class="hidden dark:block">
	<img src={srcDark} alt="Logfit Logo" width="150" height="50" />
</div>
