import type { Handle } from '@sveltejs/kit';
import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

export const handle: Handle = async ({ event, resolve }) => {
	const response = await event.fetch(`${import.meta.env.VITE_SERVER_URL}/api/user`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			accept: 'application/json',
			cookie: event.request.headers.get('cookie') as string
		}
	});

	if (response.ok) {
		const user = await response.json();
		event.locals.user = user;
	}

	return await resolve(event);
};
