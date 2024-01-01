<script lang="ts">
	import { enhance } from '$app/forms';
	import InputProvider from '$lib/contexts/input-provider/InputProvider.svelte';
	import Input from '../Input.svelte';
	import Label from '../Label.svelte';
	import InputErrorMessage from '../InputErrorMessage.svelte';
	import { onMount } from 'svelte';
	import { getContactContext } from '$lib/contexts/contact/context';
	import SubmitButton from '../form/SubmitButton.svelte';
	import CancelButton from '../form/CancelButton.svelte';
	import FileInput from '../form/FileInput.svelte';

	const contact = getContactContext();
	let files: FileList;
	let addressInput: HTMLInputElement;

	function getImageName(text: string) {
		const removeImagePathRegEx = /.*[\\/]/;
		return text.replace(removeImagePathRegEx, '');
	}

	onMount(async () => {
		const { Loader } = await import('@googlemaps/js-api-loader');
		const loader = new Loader({
			apiKey: import.meta.env.VITE_GOOGLE_API_KEY
		});

		const places = await loader.importLibrary('places');

		new places.Autocomplete(addressInput);
	});

	$: if (files) {
		$contact.file = files[0];
	}
</script>

<form
	method="POST"
	class="grid grid-cols-fill-72 md:grid-cols-[21rem_21rem] justify-center px-4 gap-4 mt-7"
	enctype="multipart/form-data"
	use:enhance
>
	<div class="flex flex-col">
		<InputProvider name="name">
			<Label>Name</Label>
			<Input aria-required="true" bind:value={$contact.name} />
			<InputErrorMessage />
		</InputProvider>
	</div>

	<div class="flex flex-col">
		<InputProvider name="title">
			<Label>Title</Label>
			<Input aria-required="true" bind:value={$contact.title} />
			<InputErrorMessage />
		</InputProvider>
	</div>

	<div class="flex flex-col">
		<InputProvider name="image" type="file">
			<FileInput
				bind:files
				bind:value={$contact.image_path}
				placeholder={getImageName($contact.image_path) || 'Upload file'}
			/>
			<InputErrorMessage />
		</InputProvider>
	</div>

	<div class="flex flex-col">
		<InputProvider name="address">
			<Label>Address</Label>
			<Input
				aria-required="true"
				bind:value={$contact.address}
				bind:elementReference={addressInput}
				placeholder="Enter an address"
			/>
			<InputErrorMessage />
		</InputProvider>
	</div>

	<div class="flex flex-col">
		<InputProvider name="phone">
			<Label>Phone</Label>
			<Input aria-required="true" bind:value={$contact.phone} />
			<InputErrorMessage />
		</InputProvider>
	</div>

	<div class="flex flex-col">
		<InputProvider name="email" type="email">
			<Label>Email</Label>
			<Input aria-required="true" bind:value={$contact.email} />
			<InputErrorMessage />
		</InputProvider>
	</div>

	<div class="col-span-full flex flex-row gap-3 mt-12 mb-7 justify-center">
		<slot {SubmitButton} {CancelButton} />
	</div>
</form>
