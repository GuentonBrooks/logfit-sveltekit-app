export type FirebaseWorkoutLogFormat = {
	uid: string;
	email: string;
	firstName: string;
	lastName: string;
	date: string;
	duration: number;
	reps: number;
	remarks: string;
};

export type WorkoutLogTableRowFormat = {
	key: string;
	uid: string;
	email: string;
	firstName: string;
	lastName: string;
	date: string;
	duration: number;
	reps: number;
	remarks: string;
};

export type StandingsTableRowFormat = {
	uid: string;
	email: string;
	firstName: string;
	lastName: string;
	ttlEntries: number;
	ttlDuration: number;
	ttlReps: number;
};
