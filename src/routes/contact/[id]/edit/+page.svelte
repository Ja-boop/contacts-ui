<script lang="ts">
	import ContactForm from '$lib/components/contact/ContactForm.svelte';
	import ContactPicture from '$lib/components/contact/ContactPicture.svelte';
	import ContactProvider from '$lib/contexts/contact/ContactProvider.svelte';
	import { formErrors } from '$lib/stores';
	import { onMount } from 'svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
	const { contact } = data;
	let isLoading = false;

	function toggleLoading() {
		isLoading = !isLoading;
	}

	$: if (form?.errors) {
		isLoading = false;
		$formErrors = form?.errors;
	}

	onMount(() => {
		$formErrors = {};
	});
</script>

<div>
	<ContactProvider {contact}>
		<label for="image" class="cursor-pointer">
			<ContactPicture />
		</label>
		<ContactForm let:CancelButton let:SubmitButton>
			<CancelButton href="/contact/{contact.id}" />
			<SubmitButton {isLoading} onClick={toggleLoading} />
		</ContactForm>
	</ContactProvider>
</div>
