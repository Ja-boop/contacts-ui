<script lang="ts">
	import type { IContact } from '$lib/services/contacts/interfaces/IContact';
	import { setContactContext } from './context';

	export let contact: IContact = {
		id: 0,
		name: '',
		user_id: '',
		title: '',
		address: '',
		email: '',
		phone: '',
		image_path: '',
		created_at: new Date(),
		updated_at: new Date()
	};

	setContactContext(contact);
</script>

<slot />
