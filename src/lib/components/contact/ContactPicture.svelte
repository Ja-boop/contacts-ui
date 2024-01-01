<script lang="ts">
	import { getContactContext } from '$lib/contexts/contact/context';
	import AccountCircleIcon from '$lib/icons/AccountCircleIcon.svelte';
	import ContactService from '$lib/services/contacts/ContactService';

	const contact = getContactContext();
	const imageUrl = ContactService.imageUrl;
	const { image_path } = $contact;
	let imagePath = image_path ? `${imageUrl}/${image_path}` : '';

	function createImageUrl(file: File) {
		return URL.createObjectURL(file);
	}

	$: if ($contact.file) {
		imagePath = createImageUrl($contact.file);
	}
</script>

<div
	class="relative col-span-full w-11/12 m-auto my-6 py-3 bg-secondary rounded-2xl flex flex-col items-center justify-center
               md:bg-background-secondary
               md:h-72
               md:mb-60
               md:justify-end
               md:p-6"
>
	<div class="flex flex-col items-center justify-center md:absolute md:-bottom-32">
		{#if imagePath}
			<img
				src={imagePath}
				alt={$contact.name}
				class="h-24 w-24 rounded-full object-cover translate-3d md:mb-4 md:h-48 md:w-48 md:border-2 md:border-primary-text"
			/>
		{:else}
			<div class="h-24 md:h-48 md:mb-4">
				<AccountCircleIcon />
			</div>
		{/if}
		<h2 class="text-2xl font-bold text-primary-text min-h-8 mb-2">{$contact.name}</h2>
		<p class="font-semibold text-secondary-text min-h-6">{$contact.title}</p>
	</div>

	<slot />
</div>
