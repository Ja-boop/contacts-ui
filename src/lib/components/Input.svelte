<script lang="ts">
	import { getInputContext } from '$lib/contexts/input-provider/context';
	import { formErrors } from '$lib/stores';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface $$Props extends HTMLInputAttributes {
		type?: string;
		name?: string;
		value?: string;
		elementReference?: HTMLInputElement;
	}

	export let elementReference = {};
	export let type = 'text';
	export let value = '';
	export let name = '';
	const input = getInputContext();
	const inputType = {
		type: $input?.type || type
	};

	function clearInputError() {
		$formErrors[$input?.name] = [];
	}
</script>

<input
	{...inputType}
	name={name || $input?.name}
	bind:value
	bind:this={elementReference}
	class="contact-input indent-4"
	on:keydown={clearInputError}
	{...$$restProps}
	data-cy={`${name || $input?.name}-input`}
/>
