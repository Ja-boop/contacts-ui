// See https://kit.svelte.dev/docs/types#app

import type { IUser } from '$lib/services/auth/interfaces/IUser';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: IUser;
			backPath?: string;
		}
		interface PageData {
			user?: IUser;
			backPath?: string;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
