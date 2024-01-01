import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import ContactService from '$lib/services/contacts/ContactService';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const id = params.id;
	const contactService = new ContactService(fetch);
	const contact = await contactService.getBy(id);

	if (contact) {
		return {
			contact
		};
	}

	throw error(404, 'Contact not found');
};
