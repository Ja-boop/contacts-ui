import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	const loginPath = '/login';
	const homePath = '/';
	const user = locals.user;

	if (!user && url.pathname !== loginPath) {
		return redirect(307, loginPath);
	}

	return { user, backPath: homePath };
};
