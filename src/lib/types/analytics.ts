/** ANALYTICS - Google Analytics Event */
export type GoogleAnalyticsEvent = {
	id: string;
	data: unknown;
	event: string;
	type: keyof Gtag.GtagCommands;
};
