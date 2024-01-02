import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const homePath = '/';
	const user = locals.user;
	const token = locals.token;

	return { user, backPath: homePath, token };
};
