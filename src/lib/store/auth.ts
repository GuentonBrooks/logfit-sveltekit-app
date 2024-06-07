import type { Writable } from 'svelte/store';
import { localStorageStore } from '@skeletonlabs/skeleton';

export const userIdState: Writable<string> = localStorageStore('userId', '');
export const emailState: Writable<string> = localStorageStore('email', '');
export const firstNameState: Writable<string> = localStorageStore('firstName', '');
export const lastNameState: Writable<string> = localStorageStore('lastName', '');
