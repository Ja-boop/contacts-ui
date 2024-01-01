<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import ContactInfo from '$lib/components/contact/ContactInfo.svelte';
	import ContactPicture from '$lib/components/contact/ContactPicture.svelte';
	import ContactProvider from '$lib/contexts/contact/ContactProvider.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { contact } = data;
	const { address, phone, email, id } = contact;
	const editPath = `/contact/${id}/edit`;

	function redirectToEdit() {
		goto(editPath);
	}
</script>

<ContactProvider {contact}>
	<div class="grid grid-cols-1 grid-rows-[auto_auto_1fr] h-[calc(100vh-60px)]">
		<ContactPicture>
			<Button on:click={redirectToEdit} class="self-end px-11 text-lg max-md:hidden">EDIT</Button>
		</ContactPicture>

		<div class="col-span-full grid w-11/12 m-auto grid-cols-1 gap-y-6 md:grid-cols-[1fr_auto] md:gap-x-20 md:w-auto">
			<ContactInfo title="Address" text={address} />
			<ContactInfo title="Phone" text={phone} />
			<ContactInfo title="Email" text={email} />
		</div>

		<div class="col-span-full flex flex-col items-center justify-end mb-5 md:hidden">
			<Button on:click={redirectToEdit} class="font-semibold max-w-40 text-lg px-28">EDIT</Button>
		</div>
	</div>
</ContactProvider>
