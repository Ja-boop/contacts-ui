import { writable } from 'svelte/store';

type FormErrors = {
	[x: string]: string[] | undefined;
	[x: number]: string[] | undefined;
	[x: symbol]: string[] | undefined;
};

export const formErrors = writable<FormErrors>({});
