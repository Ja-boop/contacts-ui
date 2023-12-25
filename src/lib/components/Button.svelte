<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	interface $$Props extends HTMLButtonAttributes {
		className: string;
	}

	export let className = '';
</script>

<button
	on:click
	class={`${className} bg-[#9378FF] py-4 flex items-center justify-center text-white rounded-full hover:brightness-90 active:brightness-100`}
	{...$$restProps}
>
	<slot />
</button>
