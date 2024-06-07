<script>
	let srcLight = '/images/guentonLight.png';
	let srcDark = '/images/guentonDark.png';
</script>

<div class="block dark:hidden">
	<img src={srcLight} alt="Guenton Logo" width="100" height="50" />
</div>

<div class="hidden dark:block">
	<img src={srcDark} alt="Guenton Logo" width="100" height="50" />
</div>
