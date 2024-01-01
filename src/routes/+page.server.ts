import ContactService from '$lib/services/contacts/ContactService';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const contactService = new ContactService(fetch);
	const contacts = await contactService.getAllByUser();

	return {
		contacts
	};
};
