<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	interface $$Props extends HTMLButtonAttributes {
		class?: string;
	}

	let className = '';

	export { className as class };
</script>

<button on:click class={`${className} contact-btn`} {...$$restProps}>
	<slot />
</button>
