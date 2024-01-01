import { writable } from 'svelte/store';

export interface ISearchStoreModel<T extends Record<PropertyKey, unknown>> {
	data: T[];
	filtered: T[];
	search: string;
}
export function createSearchStore<T extends Record<PropertyKey, unknown>>(data: T[]) {
	return writable<ISearchStoreModel<T>>({
		data,
		filtered: data,
		search: ''
	});
}

export function searchHandler(store: ISearchStoreModel<{ searchTerms: string }>) {
	const searchTerm = store.search.toLowerCase() || '';
	store.filtered = store.data.filter((item) => {
		return item.searchTerms.toLowerCase().includes(searchTerm);
	});
}
