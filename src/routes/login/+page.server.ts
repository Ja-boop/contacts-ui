import loginSchema from '$lib/utils/form-validations/schemas/login';
import { validateFormData } from '$lib/utils/form-validations/validation';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { parse } from 'set-cookie-parser';
import AuthService from '$lib/services/auth/AuthService';

export const load = (async ({ cookies, fetch, locals }) => {
	const authService = new AuthService(fetch);
	const response = await authService.initCSRFToken();

	const parsedCookies = parse(response.headers.getSetCookie());

	parsedCookies.map((cookie) => {
		cookies.set(cookie.name, cookie.value, { ...cookie, sameSite: 'strict', path: '/' });
	});

	locals.token = cookies.getAll()[0].value;
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, fetch, cookies }) => {
		const formData = await request.formData();
		const errors = await validateFormData(formData, loginSchema);
		const token = cookies.get('XSRF-TOKEN');
		const authService = new AuthService(fetch, token);

		if (!token) {
			throw new Error('Token not found');
		}

		if (errors) {
			return fail(400, { errors });
		}

		const response = await authService.login(formData);
		const parseCookies = parse(response.headers.getSetCookie());

		parseCookies.map((cookie) => {
			cookies.set(cookie.name, cookie.value, { ...cookie, sameSite: 'strict', path: '/' });
		});

		if (response.ok) {
			redirect(307, `/`);
		}
	}
};
