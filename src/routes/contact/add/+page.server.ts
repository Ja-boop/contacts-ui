import addContactSchema from '$lib/utils/form-validations/schemas/contact-add';
import { validateFormData } from '$lib/utils/form-validations/validation';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import ContactService from '$lib/services/contacts/ContactService';

export const actions: Actions = {
	default: async ({ request, fetch, locals: { token } }) => {
		const formData = await request.formData();
		const errors = await validateFormData(formData, addContactSchema);
		const contactService = new ContactService(fetch, token);

		if (!token) {
			throw new Error('Token not found');
		}

		if (errors) {
			return fail(400, { errors });
		}

		const contact = await contactService.create(formData);

		if (contact) {
			redirect(307, `/`);
		}
	}
};
