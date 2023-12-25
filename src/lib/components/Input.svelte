<script lang="ts">
	import { getInputContext } from '$lib/contexts/input-provider/context';
	import { formErrors } from '$lib/stores/form-errors';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface $$Props extends HTMLInputAttributes {
		type?: string;
		name?: string;
		value?: string;
	}

	export let type = 'text';
	export let value = '';
	export let name = '';
	const input = getInputContext();
	const inputType = {
		type: $input.type || type
	};

	function clearInputError() {
		$formErrors[$input.name] = [];
	}
</script>

<input
	{...inputType}
	name={$input.name || name}
	bind:value
	class="h-14 bg-[#FBEEFF] text-[#99879D] rounded-md indent-4"
	on:keydown={clearInputError}
	{...$$restProps}
/>
