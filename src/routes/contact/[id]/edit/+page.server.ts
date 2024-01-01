import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import ContactService from '$lib/services/contacts/ContactService';
import { validateFormData } from '$lib/utils/form-validations/validation';
import updateContactSchema from '$lib/utils/form-validations/schemas/contact-update';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const id = params.id;
	const contactService = new ContactService(fetch);
	const contact = await contactService.getBy(id);

	if (contact) {
		return {
			backPath: `/contact/${id}`,
			contact
		};
	}

	throw error(404, 'Contact not found');
};

export const actions: Actions = {
	default: async ({ request, fetch, cookies, params }) => {
		const id = params.id;
		const contactService = new ContactService(fetch);
		const formData = await request.formData();
		const image = formData.get('image');
		const errors = await validateFormData(formData, updateContactSchema);
		const token = cookies.get('XSRF-TOKEN');

		if (!token) {
			throw new Error('Token not found');
		}

		if (errors) {
			return fail(400, { errors });
		}

		if (image instanceof File) {
			!image.size && formData.delete('image');
		}

		const contact = await contactService.update(id, formData, token);

		if (contact) {
			redirect(307, `/contact/${id}`);
		}
	}
};
