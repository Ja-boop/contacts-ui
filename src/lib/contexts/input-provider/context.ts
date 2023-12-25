import { writable, type Writable } from 'svelte/store';
import { getContext, setContext } from 'svelte';

type Input = {
	name: string;
	type: string;
	error?: string;
};

function setInputContext() {
	const input = writable<Input>({
		name: '',
		type: '',
		error: ''
	});
	setContext('input', input);
}

function getInputContext() {
	return getContext<Writable<Input>>('input');
}

export { setInputContext, getInputContext };
