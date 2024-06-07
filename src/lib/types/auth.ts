/** AUTH - Format for Authenticated Users */
export type FirebaseUserShortInfoFormat = {
	uid: string;
	email: string;
	firstName: string;
	lastName: string;
};

/** AUTH - Format for Users in Firebase Real-Time Database */
export type FirebaseDatabaseUserFormat = {
	uid: string;
	email: string;
	firstName: string;
	lastName: string;
	isAdmin: boolean;
};

/** AUTH - Format for signing up users */
export type SignupFormat = {
	email: string;
	password: string;
	passwordConfirm: string;
};

/** AUTH - Format for logging in users */
export type LoginFormat = {
	email: string;
	password: string;
};

/** FIREBASE - Format for Firebase KeyValue Object */
export type FirebaseKeyValueObjectFormat = { [key: string]: string };
