<script lang="ts">
	import { goto } from '$app/navigation';
	import SearchBar from '$lib/components/input/SearchBar.svelte';
	import ContactCard from '$lib/components/contact/ContactCard.svelte';
	import EmptyContacts from '$lib/components/contact/EmptyContacts.svelte';
	import AddIcon from '$lib/icons/AddIcon.svelte';
	import ContactService from '$lib/services/contacts/ContactService';
	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import { onDestroy } from 'svelte';
	import type { PageData } from './$types';
	import Button from '$lib/components/Button.svelte';

	export let data: PageData;
	const { contacts } = data;
	const { imageUrl } = ContactService;
	const searchContacts = contacts.map((contact) => ({
		...contact,
		searchTerms: `${contact.name} ${contact.title}`
	}));

	const searchStore = createSearchStore(searchContacts);
	const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

	onDestroy(() => {
		unsubscribe();
	});
</script>

<div class="grid justify-center grid-cols-1 grid-rows-[auto_auto_1fr] pt-16 sm:h-auto sm:gap-10">
	<div class="col-span-full flex flex-col gap-6 w-11/12 m-auto">
		<h1 class="text-3xl font-bold">Contacts</h1>
		<SearchBar bind:value={$searchStore.search} />
	</div>

	<div class="col-span-full flex flex-col justify-center items-center">
		{#if !contacts.length || !$searchStore.filtered.length}
			<EmptyContacts />
		{:else}
			<ul
				class="w-full
				[&>*:nth-child(odd)]:bg-background
				[&>*:nth-child(even)]:bg-tertiary
				[&>*:nth-child(odd)]:sm:bg-tertiary
				grid grid-cols-fill-74
				sm:justify-center
				sm:gap-x-14 sm:gap-y-4 sm:px-10
				lg:gap-x-20 lg:px-20
				2xl:px-52"
			>
				{#each $searchStore.filtered as { name, title, image_path, id }}
					<a href="/contact/{id}">
						<li data-cy="contact-list-item">
							<ContactCard imageUrl={`${imageUrl}/${image_path}`} {name} {title} />
						</li>
					</a>
				{/each}
			</ul>
		{/if}
	</div>

	<div class="col-span-full flex flex-col items-end sm:items-center justify-evenly">
		<a href="/contact/add">
			<div class="fixed mr-8 mb-11 bottom-0 right-0 h-24 sm:hidden">
				<AddIcon />
			</div>
			<Button class="px-14 max-sm:hidden" data-cy="add-contact-btn">Add new contacts</Button>
		</a>
	</div>
</div>
