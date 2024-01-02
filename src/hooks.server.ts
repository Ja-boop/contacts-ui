import AuthService from '$lib/services/auth/AuthService';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const authService = new AuthService(event.fetch);
	const token = event.cookies.get('XSRF-TOKEN');
	const user = await authService.getUser();

	if (user.ok) {
		event.locals.user = await user.json();
		event.locals.token = token || '';
	}

	if (event.url.pathname !== '/login' && !event.locals.user) {
		throw redirect(307, `/login?redirect=${event.url.pathname}`);
	}

	return await resolve(event);
};
