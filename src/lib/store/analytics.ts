import type { GoogleAnalyticsEvent } from '$lib/types/analytics';
import { writable, type Writable } from 'svelte/store';

export const analyticsState: Writable<GoogleAnalyticsEvent[]> = writable([]);
