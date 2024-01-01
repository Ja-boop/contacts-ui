<script lang="ts">
	import UploadIcon from '$lib/icons/UploadIcon.svelte';
	import Label from '../Label.svelte';

	export let value = '';
	export let files: FileList;
	export let placeholder: string;
</script>

<Label>
	<p>Profile Picture</p>
	<div class="contact-input flex flex-row items-center justify-between px-4 cursor-pointer">
		<p class="text-base font-medium text-secondary-text truncate">
			{placeholder}
		</p>
		<UploadIcon />
	</div>
</Label>
<input
	type="file"
	accept=".jpg, .jpeg, .png"
	bind:files
	id="image"
	name="image"
	class="hidden"
	bind:value
	aria-required="true"
/>
