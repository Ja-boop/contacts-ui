<script lang="ts">
	import type { ActionData } from './$types';
	import UploadIcon from '$lib/icons/UploadIcon.svelte';
	import { formErrors } from '$lib/stores';
	import ContactForm from '$lib/components/contact/ContactForm.svelte';
	import ContactProvider from '$lib/contexts/contact/ContactProvider.svelte';
	import { onMount } from 'svelte';
	import ContactPicture from '$lib/components/contact/ContactPicture.svelte';

	export let form: ActionData;
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
	<ContactProvider>
		<label for="image" class="cursor-pointer">
			<ContactPicture>
				<div class="self-end text-lg max-md:hidden">
					<UploadIcon />
				</div>
			</ContactPicture>
		</label>
		<ContactForm let:SubmitButton let:CancelButton>
			<CancelButton />
			<SubmitButton {isLoading} onClick={toggleLoading} />
		</ContactForm>
	</ContactProvider>
</div>
