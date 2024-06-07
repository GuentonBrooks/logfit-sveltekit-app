/** MUSIC - Format for Listed Notes */
export type NoteFormat = {
	id: string;
	main: string;
	sub: string;
	active: boolean;
};

/** MUSIC - Format for Music Rhythm */
export type RhythmFormat = {
	signature: string;
	example: string;
	type: number;
	cycle: number;
	rec?: boolean;
};
