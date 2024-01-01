<script>
	import { Circle } from 'svelte-loading-spinners';
	import Button from '../Button.svelte';

	export let isLoading = false;
	export let onClick = () => {};
</script>

<Button class="w-1/2 font-semibold max-w-40 max-h-14" type="submit" on:click={onClick}>
	{#if isLoading}
		<Circle size="35" color="var(--secondary)" />
	{:else}
		SAVE
	{/if}
</Button>
