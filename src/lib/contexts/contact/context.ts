import { writable, type Writable } from 'svelte/store';
import { getContext, setContext } from 'svelte';
import type { IContact } from '$lib/services/contacts/interfaces/IContact';

interface ContactContext extends IContact {
	file?: File;
}

function setContactContext(contact: IContact) {
	const contactStore = writable<ContactContext>(contact);
	setContext('contact', contactStore);
}

function getContactContext() {
	return getContext<Writable<ContactContext>>('contact');
}

export { setContactContext, getContactContext };
