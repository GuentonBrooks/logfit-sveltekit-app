<script lang="ts">
	import { PUBLIC_MEASUREMENT_ID } from '$env/static/public';
	import { analyticsState } from '$lib/store/analytics';
	import { page } from '$app/stores';

	$: {
		if (typeof gtag !== 'undefined') {
			gtag('config', PUBLIC_MEASUREMENT_ID, {
				page_title: document.title,
				page_path: $page.url.pathname,
			});
		}
	}

	// subscribe to store and see if there is any event in queue(array) then run that event
	analyticsState.subscribe((queue) => {
		let nextEvent = queue && queue.length && queue.shift();
		let retries = 3;
		let previousExecutedOperationId;

		// while there is event in queue
		while (nextEvent) {
			// Validate if event format is correct
			const { type, event, data, id } = nextEvent;
			if (!type || !event || !data || !id) {
				console.warn('GA4 Event format is incorrect: ', nextEvent);
				nextEvent = queue.shift();
				continue;
			}

			// If current Event ID is not equal to previous then reassign retries to 3
			if (id && id !== previousExecutedOperationId) retries = 3;
			previousExecutedOperationId = id;

			// IF gtag is found then send event else retry till retries become 0
			if (typeof gtag !== 'undefined') {
				gtag(type, event, data);
				console.log('GA Event Delivered: ', nextEvent.id);
			} else {
				if (retries > 0) {
					retries--;
					continue;
				} else {
					console.error('Failed to find valid GA4 configuration for: ', nextEvent);
				}
			}
			nextEvent = queue.shift();
		}
	});
</script>

<svelte:head>
	<!-- Google Analytics Import -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-E73RL4BHVB"></script>

	<!-- Google Analytics Configuration -->
	<script>
		try {
			window.dataLayer = window.dataLayer || [];

			function gtag() {
				dataLayer.push(arguments);
			}

			gtag('js', new Date());
			gtag('config', 'G-E73RL4BHVB');

			console.log('GA4 Loaded Successfully');
		} catch (err) {
			console.log('GA4 Could not be loaded; ', err);
		}
	</script>
</svelte:head>
