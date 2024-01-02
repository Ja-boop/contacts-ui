import AuthService from '$lib/services/auth/AuthService';
import { type Handle } from '@sveltejs/kit';
import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

export const handle: Handle = async ({ event, resolve }) => {
	const authService = new AuthService(event.fetch);
	const token = event.cookies.get('XSRF-TOKEN');
	const user = await authService.getUser();

	if (user.ok) {
		event.locals.user = await user.json();
		event.locals.token = token || '';
	}

	return await resolve(event);
};
