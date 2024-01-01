<script lang="ts">
	import ArrowIcon from '$lib/icons/ArrowIcon.svelte';

	export let imageUrl: string;
	export let name: string;
	export let title: string;
</script>

<div class="flex flex-row py-6 px-5 items-center w-full sm:rounded-xl sm:border-2 sm:border-secondary">
	<div class="flex flex-row gap-5 w-11/12 min-w-44">
		<img
			src={imageUrl}
			alt={`${name} profile picture`}
			class="min-w-14 max-w-14 h-14 rounded-full object-cover translate-3d"
		/>

		<div class="flex flex-col w-full text-start min-w-36">
			<h2 class="text-xl font-bold truncate">{name}</h2>
			<p class="text-sm text-secondary-text">{title}</p>
		</div>
	</div>
	<div class="w-1/12">
		<ArrowIcon />
	</div>
</div>
