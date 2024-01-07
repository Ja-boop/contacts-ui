<script>
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
	import Input from '$lib/components/input/Input.svelte';

	export let value = '';
</script>

<search class="relative flex flex-row items-center">
	<SearchIcon class="absolute ml-2" />
	<Input class="w-full h-11 border-secondary border-2 rounded-lg pl-10 pr-5" type="search" name="search" bind:value />
</search>
