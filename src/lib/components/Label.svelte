<script lang="ts">
	import { getInputContext } from '$lib/contexts/input-provider/context';
	import type { HTMLLabelAttributes } from 'svelte/elements';

	const input = getInputContext();

	interface $$Props extends HTMLLabelAttributes {
		forControl?: string;
	}

	export let forControl = '';
</script>

<label for={forControl || $input.name} {...$$restProps} class="font-bold">
	<slot />
</label>
